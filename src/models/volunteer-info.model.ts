import { DataTypes } from 'sequelize';
import db from './index';
import { User } from './user.model';
import { VolunteerWorkExperience } from './volunteer-work-experience.model';
import { VolunteerEducation } from './volunteer-education.model';
import { VolunteerProjects } from './volunteer-projects.model';
import { VolunteerSkills } from './volunteer-skills.model';

export const VolunteerInfo = db.sequelize.define('volunteer_info', {
    id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    professional_role: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    have_work_experience: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    have_education: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    profile_pic: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    linkedin_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'volunteer_info',
    timestamp: true
}); 

VolunteerInfo.belongsTo(User, { foreignKey: "user_id", allowNull: false });
VolunteerInfo.hasMany(VolunteerWorkExperience, { foreignKey: "volunteer_info_id", allowNull: false });
VolunteerInfo.hasMany(VolunteerEducation, { foreignKey: "volunteer_info_id", allowNull: false });
VolunteerInfo.hasMany(VolunteerProjects, { foreignKey: "volunteer_info_id", allowNull: false });
VolunteerInfo.hasMany(VolunteerSkills, { foreignKey: "volunteer_info_id", allowNull: false });