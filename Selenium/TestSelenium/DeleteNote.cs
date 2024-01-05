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
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Assert = NUnit.Framework.Assert;

namespace TestSelenium
{
    [Binding]
    [TestFixture]
    public sealed class DeleteNote
    {
        [ThreadStatic]
        static AventStack.ExtentReports.ExtentTest feature;
        AventStack.ExtentReports.ExtentTest scenario, step;

        private readonly ScenarioContext context;
        private static IWebDriver driver;
        private static HttpClient client;

        private readonly string baseUrl = "http://localhost:3000/findById";
        private readonly string baseAPIUrl = "http://localhost:8080/notes";
        private readonly string noteUrl = "http://localhost:8080/notes";

        private string baseTitle = "Delete note test";
        private string baseContent = "555";
        private string groupId = "1111111";
        private string id = "555";

        public DeleteNote(ScenarioContext injectedContext)
        {
            context = injectedContext;
        }

        [Given(@"I have one note in database")]
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
                var json = await res.Content.ReadAsStringAsync();
                dynamic note = JsonConvert.DeserializeObject<dynamic>(json);
                baseContent = note["content"].ToString();
                baseTitle = note["title"].ToString();
                groupId = note[note["userId"]].ToString();
            }
        }

        [Given(@"I choose note")]
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

        [When(@"I press delete button")]
        public void ClickDelete()
        {
            var find = driver.FindElement(By.Name("DeleteButton"));
            find.Click();
        }

        [When(@"I press exit button")]
        public void ClickExit()
        {
            var find = driver.FindElement(By.Name("ExitButton"));
            find.Click();
        }

        [Then(@"This note will disappear change")]
        public void NoteWillDisappear()
        {
            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();

            try
            {
                var note = driver.FindElement(By.Name(baseTitle));
                Assert.Fail();
            }
            catch
            {
                Assert.True(true);
            }

        }

        [Then(@"This note will stay")]
        public void NoteWillStay()
        {
            driver.Navigate().GoToUrl((baseUrl));

            var search = driver.FindElement(By.Name("search"));
            search.SendKeys(id);

            var find = driver.FindElement(By.Name("submit"));
            find.Click();

            var note = driver.FindElement(By.Name(baseTitle));
            Assert.True(true);
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
