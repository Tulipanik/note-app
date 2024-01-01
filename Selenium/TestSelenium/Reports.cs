using AventStack.ExtentReports.Reporter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSelenium
{
    public static class Reports
    {
        static string RaportPath = Directory.GetParent(@"../../../").FullName
            + Path.DirectorySeparatorChar + "Result"
            + Path.DirectorySeparatorChar + "Result_" + "CollectedNotesTest" + Path.DirectorySeparatorChar;
        private static AventStack.ExtentReports.ExtentReports extent;
        static AventStack.ExtentReports.ExtentTest feature;
        static string featureName;
        private static int counter = 0;
        private static readonly int testsNumber = 6;

        private static void init() 
        {
            ExtentHtmlReporter reporter = new ExtentHtmlReporter(RaportPath);
            extent = new AventStack.ExtentReports.ExtentReports();
            extent.AttachReporter(reporter);
        }

        public static void close() 
        {
            if(++counter<testsNumber) 
            {
                return;
            }
            extent.Flush();
        }

        public static void getExtent() 
        {
            if (extent == null) 
            {
                init();
            }
        }

        public static AventStack.ExtentReports.ExtentTest getFeature(string fName)
        {
            if (extent == null)
            {
                init();
            }
            if (featureName!=fName)
            {
                featureName=fName;
                feature = extent.CreateTest(featureName);
            }
            return feature;
        }
    }
}
