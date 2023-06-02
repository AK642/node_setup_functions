import { DataTypes } from 'sequelize';
import db from './index';
import { VolunteerInfo } from './volunteer-info.model';

export const VolunteerEducation = db.sequelize.define('volunteer_education', {
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
    school: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    degree: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    field_of_study: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    from_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    to_date: {
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
    tableName: 'volunteer_education',
    timestamp: true
}); 

// VolunteerEducation.belongsTo(VolunteerInfo, { foreignKey: "volunteer_info_id", allowNull: false });