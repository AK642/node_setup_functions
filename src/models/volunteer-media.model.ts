import { DataTypes } from 'sequelize';
import db from './index';
import { VolunteerInfo } from './volunteer-info.model';

export const VolunteerMedia = db.sequelize.define('volunteer_media', {
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
    filename: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    sys_filename: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'volunteer_media',
    timestamp: true
}); 

VolunteerMedia.belongsTo(VolunteerInfo, { foreignKey: "volunteer_info_id", allowNull: false });