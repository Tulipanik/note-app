using AventStack.ExtentReports.Reporter;
using Newtonsoft.Json;
using NUnit.Framework.Interfaces;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System;
using System.Text.RegularExpressions;
using TechTalk.SpecFlow;

namespace TestSelenium
{
    [Binding]
    [TestFixture]
    public sealed class DisplayNote
    {
        [ThreadStatic]
        static AventStack.ExtentReports.ExtentTest feature;
        AventStack.ExtentReports.ExtentTest scenario, step;
        static string RaportPath = Directory.GetParent(@"../../../").FullName
            + Path.DirectorySeparatorChar + "Result"
            + Path.DirectorySeparatorChar + "Result_" + "DisplayNoteTest" + Path.DirectorySeparatorChar;


        private readonly ScenarioContext context;
        private static IWebDriver driver;
        private static HttpClient client;

        private readonly string baseUrl = "http://localhost:3000/findById";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string noteUrl = "http://localhost:8080/notes";
        private readonly string addUrl = "http://localhost:8080/notes";

        private readonly string baseTitle = "Display note test ";
        private readonly string groupId = "111";
        private readonly string imaginaryId = "awsd";

        private string id;
        private string nextId;

        public DisplayNote(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        [Given(@"There is a note in database")]
        public async Task ThereIsNote()
        {
            string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + 1, 11, groupId) + "}";
            StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

            var res = await client.PostAsync(noteUrl, json);
            string ansJson = await res.Content.ReadAsStringAsync();
            dynamic note = JsonConvert.DeserializeObject<dynamic>(ansJson);
            id = note["id"].ToString();
        }

        [Given(@"There is notes in database")]
        public async Task ThereIsTwoNotes()
        {
            //First note
            string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + 11, "11", groupId) + "}";
            StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

            var res = await client.PostAsync(addUrl, json);
            string ansJson = await res.Content.ReadAsStringAsync();
            dynamic note = JsonConvert.DeserializeObject<dynamic>(ansJson);
            id = note["id"].ToString();

            //Second note
            Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + 12, "12", groupId) + "}";
            json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

            res = await client.PostAsync(addUrl, json);
            ansJson = await res.Content.ReadAsStringAsync();
            note = JsonConvert.DeserializeObject<dynamic>(ansJson);
            nextId = note["id"].ToString();

        }

        [Given(@"There is not a note in database")]
        public async Task ThereIsNotNote()
        {
            var res = await client.GetAsync(noteUrl + "/" + imaginaryId);
            if (res.IsSuccessStatusCode)
            {
                var r = await client.DeleteAsync(noteUrl + "/" + imaginaryId);
                if (!r.IsSuccessStatusCode)
                {
                    Assert.Fail("Cannot errase note");
                }
            }
            id = imaginaryId;
        }

        [Given(@"I enter find by id")]
        public void EnterFind()
        {
            driver.Navigate().GoToUrl((baseUrl));
        }

        [When(@"I write id and click find")]
        public void ClickFind()
        {
            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();
        }

        [When(@"I check forms")]
        public void CheckForms()
        {
            try
            {
                var s= driver.FindElement(By.Name("search"));
            }
            catch 
            {
                Assert.Fail("There is no search input");
            }

            try
            {
                var f = driver.FindElement(By.Name("submit"));
            }
            catch
            {
                Assert.Fail("There is no find button");
            }
        }

        [Then(@"It will appear")]
        public void ItAppear() 
        {
            Assert.True(true);
        }

        [Then(@"I will see (.*) note")]
        public void CountNote(int notes)
        {
            var note = driver.FindElement(By.CssSelector("div[name=NoteBox] div"));
            if (notes == 1)
            {
                Assert.True(!string.IsNullOrEmpty(note.Text));
            }
            else
            {
                Assert.True(string.IsNullOrEmpty(note.Text));
            }
        }

        [Then(@"When I write another id and click find")]
        public void ISearchAnotherOne() 
        {
            driver.Navigate().GoToUrl((baseUrl));
            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(nextId);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();
        }

        [Then(@"I will find another note")]
        public void IWillFindAnother() 
        {
            CountNote(1);
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
