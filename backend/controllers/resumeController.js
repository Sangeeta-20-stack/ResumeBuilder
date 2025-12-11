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


const getUserResumes  = async(req,res)=>{};



const getResumeById = async(req,res)=>{};




const updateResume = async(req,res)=>{};




const deleteResume  = async(req,res)=>{};



module.exports={createResume,getUserResumes,getResumeById,updateResume,deleteResume};