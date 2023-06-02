import { Request, Response } from 'express';
import { sendOkResponse, sendBadRequestResponse } from '../utils/http-status';
import { VolunteerInfo } from '../models/volunteer-info.model';
import { VolunteerWorkExperience } from '../models/volunteer-work-experience.model';
import { VolunteerEducation } from '../models/volunteer-education.model';
import { SkillMaster } from '../models/skills-master.model';
import { VolunteerSkills } from '../models/volunteer-skills.model';
import { VolunteerProjects } from '../models/volunteer-projects.model';
import { VolunteerMedia } from '../models/volunteer-media.model';

/** Get basic volunteer info */
export const getVolunteerInfo = async (req: Request, res: Response) => {
    try {
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        sendOkResponse(res, "Volunteer info found successfully.", volunteerInfo);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Add or update volunteer professional role */
export const addProfessionalRole = async (req: Request, res: Response) => {
    try {
        const { professional_role } = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        volunteerInfo.professional_role = professional_role;
        await volunteerInfo.save();

        sendOkResponse(res, "Your professional role saved successfully.", volunteerInfo);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Get list of volunteer work experiences */
export const getWorkExperience = async (req: Request, res: Response) => {
    try {
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            },
            include: {
                model: VolunteerWorkExperience,
                where: {
                    isDeleted: false
                },
                required: false
            }
        });
        console.log('volunteerInfo: ', volunteerInfo);
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        if(!volunteerInfo.volunteer_work_experiences?.length) return sendBadRequestResponse(res, "Volunteer work experience not added yet.");

        sendOkResponse(res, "Volunteer work experience found successfully.", volunteerInfo);   
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Add volunteer work experience */
export const addWorkExperience = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        objParams.volunteer_info_id = volunteerInfo.id;

        const volunteerWorkExperience = await VolunteerWorkExperience.create(objParams); 
        if(!volunteerWorkExperience) return sendBadRequestResponse(res, "Unable to add work experience.");

        sendOkResponse(res, "Work experience added successfully.", volunteerWorkExperience);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Update volunteer work experience. */
export const updateWorkExperience = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const workExperience = await VolunteerWorkExperience.findOne({
            where: {
                id: objParams.id,
                isDeleted: false
            }
        });
        if(!workExperience) return sendBadRequestResponse(res, "Volunteer work experience not found.");

        await VolunteerWorkExperience.update(objParams, {
            where: {
                id: objParams.id
            }
        });

        sendOkResponse(res, "Volunteer work experience updated successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Delete volunteer work experience */
export const deleteWorkExperience = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const workExperience = await VolunteerWorkExperience.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        if(!workExperience) return sendBadRequestResponse(res, "Volunteer work experience not found.");

        workExperience.isDeleted = true;
        await workExperience.save();

        sendOkResponse(res, "Volunteer work experience deleted successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Update volunteer info */
export const updateVolunteerInfo = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        await VolunteerInfo.update(objParams, {
            where: {
                id: volunteerInfo.id
            }
        });

        sendOkResponse(res, "Volunteer info updated successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Get list of volunteer educations */
export const getEducation = async (req: Request, res: Response) => {
    try {
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            },
            include: {
                model: VolunteerEducation,
                where: {
                    isDeleted: false
                },
                required: false
            }
        });
        console.log('volunteerInfo: ', volunteerInfo);
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        if(!volunteerInfo.volunteer_educations?.length) return sendBadRequestResponse(res, "Volunteer education not added yet.");

        sendOkResponse(res, "Volunteer education found successfully.", volunteerInfo);   
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Add volunteer education */
export const addEducation = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        objParams.volunteer_info_id = volunteerInfo.id;

        const volunteerEducation = await VolunteerEducation.create(objParams); 
        if(!volunteerEducation) return sendBadRequestResponse(res, "Unable to add education.");

        sendOkResponse(res, "Education added successfully.", volunteerEducation);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Update volunteer education. */
export const updateEducation = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const education = await VolunteerEducation.findOne({
            where: {
                id: objParams.id,
                isDeleted: false
            }
        });
        if(!education) return sendBadRequestResponse(res, "Volunteer education not found.");

        await VolunteerEducation.update(objParams, {
            where: {
                id: objParams.id
            }
        });

        sendOkResponse(res, "Volunteer education updated successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Delete volunteer education */
export const deleteEducation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const education = await VolunteerEducation.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        if(!education) return sendBadRequestResponse(res, "Volunteer education not found.");

        education.isDeleted = true;
        await education.save();

        sendOkResponse(res, "Volunteer education deleted successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Get all master skills */
export const getAllMasterSkills = async (req: Request, res: Response) => {
    try {
        const skills = await SkillMaster.findAll({
            where: {
                isDeleted: false
            }
        });
        if(!skills.length) return sendBadRequestResponse(res, "Skills not found.");
        
        sendOkResponse(res, "Skills found successfully.", skills);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Get all volunteer skills */
export const getSkills = async (req: Request, res: Response) => {
    try {
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            },
            include: {
                model: VolunteerSkills,
                where: {
                    isDeleted: false
                },
                required: false
            }
        });
        console.log('volunteerInfo: ', volunteerInfo);
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        if(!volunteerInfo.volunteer_skills?.length) return sendBadRequestResponse(res, "Volunteer skills not added yet.");

        sendOkResponse(res, "Volunteer skills found successfully.", volunteerInfo);   
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Add a new skill */
export const addSkill = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;
        
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        objParams.volunteer_info_id = volunteerInfo.id;

        const skill = await VolunteerSkills.create(objParams);
        if(!skill) return sendBadRequestResponse(res, "Unable to add skill.");

        sendOkResponse(res, "Skill added successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Delete volunteer skill */
export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const skill = await VolunteerSkills.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        if(!skill) return sendBadRequestResponse(res, "Skill not found.");

        skill.isDeleted = true;
        await skill.save();

        sendOkResponse(res, "Skill removed successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
}

/** Get list of volunteer projects */
export const getProjects = async (req: Request, res: Response) => {
    try {
        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            },
            include: {
                model: VolunteerProjects,
                where: {
                    isDeleted: false
                },
                required: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        if(!volunteerInfo.volunteer_projects?.length) return sendBadRequestResponse(res, "Volunteer projects not added yet.");

        sendOkResponse(res, "Volunteer projects found successfully.", volunteerInfo);   
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Add volunteer project */
export const addProject = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");

        objParams.volunteer_info_id = volunteerInfo.id;

        const volunteerProject = await VolunteerProjects.create(objParams); 
        if(!volunteerProject) return sendBadRequestResponse(res, "Unable to add project.");

        sendOkResponse(res, "Project added successfully.", volunteerProject);
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Update volunteer project. */
export const updateProject = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const project = await VolunteerProjects.findOne({
            where: {
                id: objParams.id,
                isDeleted: false
            }
        });
        if(!project) return sendBadRequestResponse(res, "Volunteer project not found.");

        await VolunteerProjects.update(objParams, {
            where: {
                id: objParams.id
            }
        });

        sendOkResponse(res, "Volunteer project updated successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Delete volunteer project */
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const project = await VolunteerProjects.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        if(!project) return sendBadRequestResponse(res, "Volunteer project not found.");

        project.isDeleted = true;
        await project.save();

        sendOkResponse(res, "Volunteer project deleted successfully.");
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
};

/** Update volunter info */
export const updateProfileInfo = async (req: Request, res: Response) => {
    try {
        const objParams = req.body;

        const volunteerInfo = await VolunteerInfo.findOne({
            where: {
                user_id: req.session.userId,
                isDeleted: false
            }
        });
        if(!volunteerInfo) return sendBadRequestResponse(res, "Volunteer info not found.");
        
        console.log("File: ", req.file);
        // @ts-ignore
        const profileObj = req.file;

        if(profileObj) {
            const fileObj = {
                volunteer_info_id: volunteerInfo.id,
                filename: profileObj.originalname,
                sys_filename: profileObj.filename,
                size: profileObj.size,
                type: profileObj.fieldname,
            };

            await VolunteerMedia.destroy({
                where: {
                    volunteer_info_id: volunteerInfo.id
                }
            });

            const profile_pic = await VolunteerMedia.create(fileObj);

            objParams.profile_pic = `http://localhost:5005/MediaFiles/profiles/${profile_pic?.sys_filename}`;

            await VolunteerInfo.update(objParams, {
                where: {
                    id: volunteerInfo.id
                }
            });

            return sendOkResponse(res, 'Volunteer profile data saved successfully.');
        }

        await VolunteerInfo.update(objParams, {
            where: {
                id: volunteerInfo.id
            }
        });

        sendOkResponse(res, 'Volunteer profile data saved successfully.');
    } catch(err) {
        console.log("Error: ", err);
        sendBadRequestResponse(res);
    }
}