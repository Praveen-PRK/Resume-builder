import Template1 from "./Template1";

const ResumePreview = ({ data }) => {
  return (
    <div style={{ 
      width: "100%", 
      backgroundColor: "#f5f5f5", // Light grey background
      padding: "20px", 
      // height: "90vh", 
      // overflowY: "auto",
      display: "flex",
      justifyContent: "center"
    }}>
      <Template1 data={data} />
    </div>
  );
};

export default ResumePreview;