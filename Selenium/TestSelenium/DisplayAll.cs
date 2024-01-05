using OpenQA.Selenium.Firefox;
using OpenQA.Selenium;
using TechTalk.SpecFlow;
using Newtonsoft.Json;
using AventStack.ExtentReports.Reporter;

namespace TestSelenium
{
    [Binding]
    [TestFixture]
    public sealed class DisplayAll
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

        private readonly string baseUrl = "http://localhost:3000/notes";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string deleteUrl = "http://localhost:8080/notes/";
        private readonly string addUrl = "http://localhost:8080/notes";

        private readonly string baseTitle = "Display all test ";
        private readonly string groupId = "1";

        public DisplayAll(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        //Given In database are 0 notes
        [Given(@"In database are (.*) notes")]
        public async Task InDatabase(int notes)
        {
            for (int i = 0; i < notes; i++)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + i, i + "" + i, groupId)+"}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                await client.PostAsync(addUrl, json);
            }
            driver.Navigate().GoToUrl((baseUrl));
        }

        [Given(@"In database are (.*) notes, (.*) with (.*) groupID and (.*) with (.*)")]
        public async Task InDatabaseGroupId(int allNotes, int firstGroupLen,string firstGroup, int secondGroupLen, string secondGroup)
        {
            if (allNotes != (firstGroupLen + secondGroupLen)) 
            {
                throw new ArgumentException("Sum of group notes isn't equal to all notes");
            }

            for (int i = 0; i < firstGroupLen; i++)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + i+i, i + "" + i, firstGroup) + "}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                await client.PostAsync(addUrl, json);
            }
            for (int i = 0; i < secondGroupLen; i++)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle + i + i, i + "" + i, secondGroup) + "}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                await client.PostAsync(addUrl, json);
            }
            driver.Navigate().GoToUrl((baseUrl));
        }

        [When(@"I click display all")]
        public void ClickDisplayAll()
        {
            var disp = driver.FindElement(By.Name("DisplayAll"));
            disp.Click();
        }

        //Then 0 notes will display
        [Then(@"(.*) notes will display")]
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
            driver.Manage().Timeouts().PageLoad = System.TimeSpan.FromSeconds(10);
            driver.Manage().Timeouts().ImplicitWait = System.TimeSpan.FromSeconds(10);
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
