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
    public sealed class UpdateNote
    {
        [ThreadStatic]
        static AventStack.ExtentReports.ExtentTest feature;
        AventStack.ExtentReports.ExtentTest scenario, step;
        static string RaportPath = Directory.GetParent(@"../../../").FullName
            + Path.DirectorySeparatorChar + "Result"
            + Path.DirectorySeparatorChar + "Result_" + "UpdateNoteTest" + Path.DirectorySeparatorChar;

        private readonly ScenarioContext context;
        private static IWebDriver driver;
        private static HttpClient client;

        private readonly string baseUrl = "http://localhost:3000/findById";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string noteUrl = "http://localhost:8080/notes";

        private string baseTitle = "Update note test";
        private string baseContent = "444";
        private string groupId = "1111";
        private readonly string mod = "zzz";
        private readonly string illegalMod = "";
        private string id = "444";

        public UpdateNote(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        [Given(@"I have note in database")]
        public async Task ThereIsNote()
        {
            var res = await client.GetAsync(noteUrl + "/" + id);
            if (!res.IsSuccessStatusCode)
            {
                string Input = "{" + string.Format("\r\n  \"title\": \"{0}\",\r\n  \"content\": \"{1}\",\r\n  \"userId\": \"{2}\"\r\n", baseTitle, baseContent, groupId) + "}";
                StringContent json = new StringContent(Input, System.Text.Encoding.UTF8, "application/json");

                var r = await client.PostAsync(noteUrl, json);
                if (!r.IsSuccessStatusCode)
                {
                    Assert.Fail("Cannot add note");
                }
                string ansJson = await r.Content.ReadAsStringAsync();
                dynamic note = JsonConvert.DeserializeObject<dynamic>(ansJson);
                id = note["id"].ToString();
            }
            else 
            { 
                var json=await res.Content.ReadAsStringAsync();
                dynamic note = JsonConvert.DeserializeObject<dynamic>(json);
                baseContent = note["content"].ToString();
                baseTitle = note["title"].ToString();
                groupId = note[note["userId"]].ToString();
            }
        }

        [Given(@"I choose this note")]
        public void ChooseNote()
        {
            driver.Navigate().GoToUrl((baseUrl));

            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();

            var note = driver.FindElement(By.Name(baseTitle));
            note.Click();
        }

        [When(@"I make changes")]
        public void MakeChange()
        {
            var title = driver.FindElement(By.Name("TitleField"));
            title.SendKeys(mod);
            var cont = driver.FindElement(By.Name("ContentField"));
            cont.SendKeys(mod);
        }

        [When(@"I press update button")]
        public void ClickUpdate()
        {
            var find = driver.FindElement(By.Name("UpdateButton"));
            find.Click();
        }

        [When(@"I make illegal changes")]
        public void MakeIllegalChange()
        {
            var title = driver.FindElement(By.Name("TitleField"));
            title.Clear();
            var cont = driver.FindElement(By.Name("ContentField"));
            cont.Clear();
        }

        [When(@"I press exit")]
        public void ClickExit()
        {
            var find = driver.FindElement(By.Name("ExitButton"));
            find.Click();
        }

        [Then(@"This note will change")]
        public void NoteChange()
        {
            driver.Navigate().GoToUrl((baseUrl));

            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();

            var note = driver.FindElement(By.Name(baseTitle + mod));
            note.Click();
            var content = driver.FindElement(By.Name("ContentField"));
            Assert.True(content.GetAttribute("value").Equals(baseContent + mod));
        }

        [Then(@"This note will not change")]
        public void NoteNotChange()
        {
            driver.Navigate().GoToUrl((baseUrl));

            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();

            var note = driver.FindElement(By.Name(baseTitle));
            note.Click();
            var content = driver.FindElement(By.Name("ContentField"));
            Assert.True(content.GetAttribute("value").Equals(baseContent));
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

        [AfterFeature]
        public static void QuitDriver()
        {
            driver.Quit();
        }

        [BeforeTestRun]
        public static void AddRaport()
        {

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
            Reports.close();
        }
    }
}