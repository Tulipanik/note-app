using AventStack.ExtentReports.Reporter;
using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System.Text.RegularExpressions;
using TechTalk.SpecFlow;

namespace TestSelenium
{

    [Binding]
    [TestFixture]
    public sealed class AddingNotes
    {
        //static AventStack.ExtentReports.ExtentReports extent;
        [ThreadStatic]
        static AventStack.ExtentReports.ExtentTest feature;
        AventStack.ExtentReports.ExtentTest scenario,step;

        private readonly ScenarioContext context;
        private static IWebDriver driver;
        private static HttpClient client;

        private readonly string baseUrl = "http://localhost:3000/add";
        private readonly string addUrl = "http://localhost:8080/notes";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string deleteUrl = "http://localhost:8080/notes/";
        private readonly string urlParam = "?group=";

        private readonly string titleStringInExistingNote = "Existing Note test";
        private readonly string discriptionStringInExistingNote = "Existing Test";

        private readonly int groupId = 11;
        private readonly string titleString = "Add Note test";
        private readonly string discriptionString = "Test";
        private readonly string errorMessage = "Title and group are required.";
        public AddingNotes(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        //class="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
        //class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1s46zzy-MuiButtonBase-root-MuiButton-root"
        //http://localhost:3000/add?group=11

        [Given(@"I have note in this group")]
        public async Task HaveNote() 
        {
            string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", titleStringInExistingNote, discriptionStringInExistingNote, groupId) + "}";
            StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

            await client.PostAsync(addUrl, json);
        }

        [Given(@"I not have note in this group")]
        //I reset database, so it pointless to check if there are note within a group
        public void HaveNoNote(){}

        [Given(@"I fullfill note forms")]
        public void FullfillNoteForms() 
        {
            driver.Navigate().GoToUrl((baseUrl+urlParam+groupId));

            var title = driver.FindElement(By.Name("Title"));
            var disc = driver.FindElement(By.Name("Discription"));
            
            title.SendKeys(titleString);
            disc.SendKeys(discriptionString);
        }

        [Given(@"I fullfill note forms without name")]
        public void FullfillNoteFormsWithoutName()
        {
            driver.Navigate().GoToUrl(baseUrl + urlParam + groupId);

            var disc = driver.FindElement(By.Name("Discription"));

            disc.SendKeys(discriptionString);
        }

        [Given(@"I fullfill note forms without groupId")]
        public void FullfillNoteFormsWithoutGroupId()
        {
            driver.Navigate().GoToUrl(baseUrl);

            var title = driver.FindElement(By.Name("Title"));
            var disc = driver.FindElement(By.Name("Discription"));

            title.SendKeys(titleString + " nextOne");
            disc.SendKeys(discriptionString);
        }

        [When(@"I press add")]
        public void PressAdd()
        {
            var add = driver.FindElement(By.Name("Submit"));
            add.Click();
        }

        [Then(@"New notes will popup")]
        public void NewNotesWillPopup()
        {
            driver.FindElement(By.Name(titleString));
            Assert.True(true);
        }

        [Then(@"There will be (.*) note")]
        public void ThereWillBeXNotes(int notes) 
        {
            var notesList = driver.FindElements(By.CssSelector("div[name=NoteBox] div"));
            Assert.True(notesList.Count == notes);
        }

        [Then(@"Error popup display")]
        public void ErrorPopupDisplay()
        {
            var errMsg=driver.FindElement(By.Name("ErrorMessage"));
            Assert.AreEqual(errMsg.Text, errorMessage);
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