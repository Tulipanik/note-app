using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportsCollector
{
    public class Program
    {
        public static void Main() 
        {
            ReportsCollector reportsCollector = new ReportsCollector();
            reportsCollector.run();
        }
    }

    public class ReportsCollector
    {
        public ReportsCollector() 
        { 
        
        }

        public void run() 
        {
            ExtentReports extent = new ExtentReports();
            TestModelReportBuilder modelBuilder = new TestModelReportBuilder();
            modelBuilder.recreateModelFromJson(extent, new File("target/spark/test.json"));
            ExtentSparkReporter spark = new ExtentSparkReporter("target/spark/");
            JsonFormatter json = new JsonFormatter("target/spark/test.json");
            extent.attachReporter(spark, json);
        }
    }
}
