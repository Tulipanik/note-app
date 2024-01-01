using AventStack.ExtentReports.Reporter;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using Newtonsoft.Json;

namespace TestSelenium
{
    [Binding]
    [TestFixture]
    public sealed class SearchNoteByGroup
    {
        [ThreadStatic]
        static AventStack.ExtentReports.ExtentTest feature;
        AventStack.ExtentReports.ExtentTest scenario, step;
        static string RaportPath = Directory.GetParent(@"../../../").FullName
            + Path.DirectorySeparatorChar + "Result"
            + Path.DirectorySeparatorChar + "Result_" + "DisplayAllTest" + Path.DirectorySeparatorChar;

        private readonly ScenarioContext context;
        private static IWebDriver driver;
        private static HttpClient client;

        private readonly string baseUrl = "http://localhost:3000/notes?group=";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string deleteUrl = "http://localhost:8080/notes/";
        private readonly string addUrl = "http://localhost:8080/notes";

        private readonly string baseTitle = "Display all test ";
        private string groupId = "2222222";

        public SearchNoteByGroup(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        [Given(@"I have (.*) notes within same group")]
        public async Task NotesInOneGroup(int notes)
        {
            for (int i = 0; i < notes; i++)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + i, i + "" + i, groupId) + "}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                await client.PostAsync(addUrl, json);
            }
        }

        [Given(@"I have (.*) notes with different groups")]
        public async Task NotesInDifferentGroups(int notes)
        {
            groupId = "0";
            for (int i = 0; i < notes; i++)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + i, i + "" + i, i) + "}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                await client.PostAsync(addUrl, json);
            }
        }

        [When(@"I enter find by group")]
        public void ClickDisplayAll()
        {
            driver.Navigate().GoToUrl((baseUrl+groupId));
        }

        //Then 0 notes will display
        [Then(@"I will see (.*) notes")]
        public void NotesWillDisplay(int notes)
        {
            var notesList = driver.FindElements(By.CssSelector("div[name=NoteBox] div"));
            Assert.True(notesList.Count == notes);
        }

        [BeforeFeature]
        public static void Setup()
        {
            client = new HttpClient();
            var options = new FirefoxOptions();
            options.AddArguments("--headless");
            options.SetLoggingPreference(LogType.Browser, LogLevel.All);
            driver = new FirefoxDriver(options);

            //Setup driver
            driver.Manage().Timeouts().PageLoad = System.TimeSpan.FromSeconds(5);
            driver.Manage().Timeouts().ImplicitWait = System.TimeSpan.FromSeconds(5);
        }

        [AfterScenario]
        public async Task ResetDB()
        {
            try
            {
                var response = await client.GetAsync(baseAPIUrl);
                string json = await response.Content.ReadAsStringAsync();
                dynamic xxx = JsonConvert.DeserializeObject<dynamic>(json);
                foreach (dynamic x in xxx)
                {
                    string id = x["id"].Value.ToString();
                    var r = await client.DeleteAsync(deleteUrl + id);
                }
            }
            catch (Exception err) { Console.WriteLine(); }
        }

        [AfterFeature]
        public static void QuitDriver()
        {
            driver.Quit();
        }

        [BeforeTestRun]
        public static void AddRaport()
        {
            /*ExtentHtmlReporter reporter = new ExtentHtmlReporter(RaportPath);
            extent = new AventStack.ExtentReports.ExtentReports();
            extent.AttachReporter(reporter);*/

            Reports.getExtent();
        }

        [BeforeFeature]
        public static void BeforeFeature(FeatureContext context)
        {
            feature = Reports.getFeature(context.FeatureInfo.Title);
        }

        [BeforeScenario]
        public void AddNode(ScenarioContext context)
        {
            scenario = feature.CreateNode(context.ScenarioInfo.Title);
        }

        [BeforeStep]
        public void BeforeStep()
        {
            step = scenario;
        }

        [AfterStep]
        public void AfterStep(ScenarioContext context)
        {
            if (context.TestError == null)
            {
                step.Log(AventStack.ExtentReports.Status.Pass, context.StepContext.StepInfo.Text);
            }
            else
            {
                step.Log(AventStack.ExtentReports.Status.Fail, context.StepContext.StepInfo.Text);
            }
        }

        [AfterFeature]
        public static void AfterFeature()
        {
            //extent.Flush();
            Reports.close();
        }
    }
}
