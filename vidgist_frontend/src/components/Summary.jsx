import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { summaryDetail, summaryStatus } from "../api";




  
  

export default function Summary({id,setId}) {
  const [activeTab, setActiveTab] = useState("summary");
  const link = localStorage.getItem("link")
  const [thumb, setThumb] = useState();
  const [summary, setSummary] = useState("YOUR SUMMARY IS LOADING IT TAKES TIME WAIT FOR FEW MINUTUE...");
  const [keypoint, setKeypoint] = useState("YOUR Key Points ARE LOADING IT TAKES TIME WAIT FOR FEW MINUTUE...");
  const [transcript, setTranscript] = useState("YOUR TRANSCRIPT IS LOADING IT TAKES TIME WAIT FOR FEW MINUTUE...");
  const [ispoll, setIsPoll] = useState(false);

  const getsummary = async (link) => {
    const summary_data = await summaryDetail(link)
    if (summary_data.message) {
      setId(summary_data.id);
      setThumb(summary_data.thumb);
      setIsPoll(true)
    }
    else {
      setId(summary_data.id)
      setThumb(summary_data.thumb)
      setTranscript(summary_data.transcript)
      setSummary(summary_data.summary)
      setKeypoint(summary_data.keypoints)
      setIsPoll(false)
    }
  }

  const getstatus = async(id) => {
    const summary_data = await summaryStatus(id);
    if(summary_data.status=="completed"){
      setTranscript(summary_data.transcript)
      setSummary(summary_data.summary)
      setKeypoint(summary_data.keypoints)
      setIsPoll(false)
    }
  }

  useEffect(() => {
    getsummary(link)
  }, [link])

  useEffect(() => {

    if(!ispoll || !id) return;

    const interval = setInterval(() => {
      console.log(id)
      getstatus(id)
    }, 60000); // 60000 ms = 1 minute
    return () => clearInterval(interval);
  }, [id,ispoll])

  const summaryPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold").setFontSize(16).text("YouTube Video Summary", 10, 10);
    doc.setFont("helvetica", "normal").setFontSize(12).text("Summary:", 10, 20);
    doc.setFontSize(10).text(summary, 10, 30, { maxWidth: 180 });
    doc.addPage();
    doc.setFontSize(12).text("Key Points:", 10, 10);
    doc.setFontSize(10).text(keypoint, 10, 20, { maxWidth: 180 });
    doc.save("summary.pdf");
  };

  const transcriptPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold").setFontSize(16).text("YouTube Video Transcript", 10, 10);
    doc.setFont("helvetica", "normal").setFontSize(12).text("Transcript:", 10, 20);
    doc.setFontSize(10).text(transcript, 10, 30, { maxWidth: 180 });
    doc.save("transcript.pdf");
  };



  return (
    <div className="w-full bg-[#f3f8fb] p-6 h-full min-h-[100vh]">

      {/* Responsive YouTube Video */}

      <div className="grid grid-cols-1 grid-rows-9 gap-4  h-[90vh]">
        <div className="row-span-4">
          <div className="relative flex justify-center h-full w-full mb-6">
            <iframe
              src={thumb}
              className=" w-[80vh] h-full rounded-lg shadow"
            ></iframe>
          </div>
        </div>

        <div className="col-span-2 row-span-5 h-full">
          <div className="h-full">
            {/* Tabs */}
            <div className="flex flex-wrap lg:justify-start lg:pl-6 justify-center mb-2 gap-2">
              {["summary", "keypoints", "transcript"].map((tab) => (
                <div
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium capitalize cursor-pointer transition-all duration-300 rounded-lg
              ${activeTab === tab ? "border-b-2 border-blue-500 bg-blue-500 text-white" : "text-gray-500 hover:text-blue-500 hover:bg-green-50"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow text-justify overflow-y-auto whitespace-pre-line text-sm md:text-lg md:h-[75%] h-[65%]">
              {activeTab === "summary" && <p>{summary}</p>}
              {activeTab === "keypoints" && <p>{keypoint}</p>}
              {activeTab === "transcript" && <p>{transcript}</p>}
            </div>

            {/* PDF Download Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <button
                className="w-full sm:w-auto px-4 py-2 font-medium text-md bg-[#09AFF4] hover:bg-white text-white hover:text-[#09AFF4] border-2 hover:border-[#09AFF3] rounded-lg"
                onClick={summaryPDF}
              >
                Generate Summary PDF
              </button>
              <button
                className="w-full sm:w-auto px-4 py-2 font-medium text-md  bg-[#09AFF4] hover:bg-white text-white hover:text-[#09AFF4] border-2 hover:border-[#09AFF3] rounded-lg"
                onClick={transcriptPDF}
              >
                Generate Transcript PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}