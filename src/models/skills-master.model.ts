import { DataTypes } from 'sequelize';
import db from './index';

export const SkillMaster = db.sequelize.define('skill_master', {
    id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'skill_master',
    timestamp: true
}); 

(async () => {
    const skills = [
        { id: 1, name: "Java" },
        { id: 2, name: "Kotlin" },
        { id: 3, name: "React" },
        { id: 4, name: "Node" },
        { id: 5, name: "SQL" },
    ];

    await SkillMaster.bulkCreate(skills, {
        updateOnDuplicate: ["name"]
    });
})();