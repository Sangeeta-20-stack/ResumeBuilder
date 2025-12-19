const fs=require("node:fs");
const path=require("node:path");
const Resume =require("../models/Resume");

const createResume = async(req,res) =>{
    try {
        const {title}=req.body;

        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:"",
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                github:"",
                website:"",
            },
            workExperience:[
                {
                    company:"",
                    role:"",
                    startDate:"",
                    endDate:"",
                    description:"",
                },
            ],
            education:[
                {
                    degree:"",
                    institution:"",
                    startDate:"",
                    endDate:"", 
                },
            ],
            skills:[
                {
                    name:"",
                    progress:0,
                },
            ],
            projects:[
                {
                    title:"",
                    description:"",
                    github:"",
                    liveDemo:"",
                },
            ],
            certifications:[
                {
                    title:"",
                    issuer:"",
                    year:"",
                },
            ],
            languages:[
                {
                    name:"",
                    progress:0, 
                },
            ],
            interests:[""],
        };
        const newResume=await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
        });
        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({message:"Failed to create Resume",error:error.message});
    }
};


const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });

    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};



const getResumeById = async(req,res)=>{
     try {
   const resume= await Resume.findOne({_id:req.params.id, userId: req.user._id});
   if(!resume){
    return res.status(404).json({message:"Resume not found"});
   }
   res.json(resume);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }

};




const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    // Merge updated fields
    Object.assign(resume, req.body);

    const savedResume = await resume.save();

    // ✅ Use res, not req
    return res.status(200).json(savedResume);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update resume",
      error: error.message,
    });
  }
};




const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    const uploadsFolder = path.join(__dirname, "..", "uploads");

    // Delete thumbnail
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    // Delete profile preview
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    // Delete resume from DB
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    // ✅ Send success response
    return res.status(200).json({ message: "Resume deleted successfully" });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};




module.exports={createResume,getUserResumes,getResumeById,updateResume,deleteResume};