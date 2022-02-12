const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Activity extends Model {
    static interested(body, models) {
        return models.Interested.create({
            user_id: body.user_id,
            activity_id: body.activity_id
        }).then(() => {
            return Activity.findOne({
                where: {
                    id: body.activity_id
                },
                attributes: [
                    'id',
                    'title',
                    'description',
                    'location',
                    'occurrence',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM interested WHERE activity.id = interested.activity_id)'),
                        'interested_count'
                    ]
                ]
            });
        });
    }
};

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        occurrence: {
            type: DataTypes.DATE,
            allowNull: false
        },
        organizer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'activity'
    }
);

module.exports = Activity;