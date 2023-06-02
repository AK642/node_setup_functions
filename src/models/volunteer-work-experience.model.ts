import { DataTypes } from 'sequelize';
import db from './index';
import { VolunteerInfo } from './volunteer-info.model';

export const VolunteerWorkExperience = db.sequelize.define('volunteer_work_experience', {
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'volunteer_work_experience',
    timestamp: true
}); 

// VolunteerWorkExperience.belongsTo(VolunteerInfo, { foreignKey: "volunteer_info_id", allowNull: false });