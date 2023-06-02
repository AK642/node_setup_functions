import { DataTypes } from 'sequelize';
import db from './index';
import { VolunteerInfo } from './volunteer-info.model';
import { SkillMaster } from './skills-master.model';

export const VolunteerSkills = db.sequelize.define('volunteer_skills', {
    id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    volunteer_info_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'volunteer_info',
            key: 'id'
        }
    },
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    skill: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'volunteer_skills',
    timestamp: true
}); 

// VolunteerSkills.belongsTo(VolunteerInfo, { foreignKey: "volunteer_info_id", allowNull: false });
VolunteerSkills.belongsTo(SkillMaster, { foreignKey: "skill_id", allowNull: true });