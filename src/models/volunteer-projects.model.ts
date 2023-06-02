import { DataTypes } from 'sequelize';
import db from './index';
import { VolunteerInfo } from './volunteer-info.model';

export const VolunteerProjects = db.sequelize.define('volunteer_projects', {
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
    project_name: {
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
    output: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'volunteer_projects',
    timestamp: true
}); 

// VolunteerProjects.belongsTo(VolunteerInfo, { foreignKey: "volunteer_info_id", allowNull: false });