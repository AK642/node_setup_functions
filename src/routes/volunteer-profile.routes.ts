import { Router } from 'express';
import { addEducation, addProfessionalRole, addProject, addSkill, addWorkExperience, deleteEducation, deleteProject, deleteSkill, deleteWorkExperience, getAllMasterSkills, getEducation, getProjects, getSkills, getVolunteerInfo, getWorkExperience, updateEducation, updateProfileInfo, updateProject, updateVolunteerInfo, updateWorkExperience } from '../controllers/volunteer-profile.controller';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const mediaStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            cb(null, 'src/MediaFiles/profiles')
        }catch(e) {
            console.log("Error: ", e);
        }
    },
    filename: function (req, file, cb) {
        try {
            const extension = file.originalname.split('.').pop();
            cb(null, `${uuidv4()}.${extension}`)
        }catch(e) {
            console.log("Error: ",e);
        }
    }
});
    
const mediaUpload = multer({ storage: mediaStorage });

const router = Router();

router.get('/', getVolunteerInfo);
router.put('/', updateVolunteerInfo);

router.post('/add-role', addProfessionalRole);

router.get('/work-experience', getWorkExperience);
router.post('/work-experience', addWorkExperience);
router.put('/work-experience', updateWorkExperience);
router.delete('/work-experience/:id', deleteWorkExperience);

router.get('/education', getEducation);
router.post('/education', addEducation);
router.put('/education', updateEducation);
router.delete('/education/:id', deleteEducation);

router.get('/master-skill', getAllMasterSkills);
router.get('/skill', getSkills);
router.post('/skill', addSkill);
router.delete('/skill/:id', deleteSkill);

router.get('/project', getProjects);
router.post('/project', addProject);
router.put('/project', updateProject);
router.delete('/project/:id', deleteProject);

router.post('/updateInfo', mediaUpload.single('profile'), updateProfileInfo);

export default router;