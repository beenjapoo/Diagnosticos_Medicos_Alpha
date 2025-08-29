// 
const {DataTypes} = required('sequelize');
const sequelize = requiere('../config/database');

const Disease = sequelize.define('Disease',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('common', 'skin'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    symptoms: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('symptoms');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value){
            this.setDataValue('symptoms',JSON.stringify(value));
        }
    },
    common_treatments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    urgency_level: {
        type: DataTypes.ENUM('Baja','Media','Alta','Critica'),
        allowNull: false
    },
    image_patterns: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('image_patterns');
            return rawValue ? JSON.parse(rawValue):[];
        },
        set(value){
            this.setDataValue('image_patters', JSON.stringify(value));
        }
    }
});

module.export = Disease;