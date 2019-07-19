import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Please enter your username'
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: {
        args: false,
        message: 'Please enter your email'
      }
    },
    bio: DataTypes.STRING,
    image: DataTypes.BLOB,
    favorites: [{
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    }],
    following: [{
      type: DataTypes.INTEGER,
      allowNull: {
        args: true
      }
    }],
    isVerified: {
        type: DataTypes.BOOLEAN
    },
    socialId: {
        allowNull: {
            args: true
        },
        type: DataTypes.STRING
    },
    provider: {
        allowNull: {
            args: true
        },
        type: DataTypes.STRING
    },
    hash: {
        allowNull: {
            args: true
        },
        type: DataTypes.STRING
    }
  }, {
      hooks: {
        beforeCreate: async (user) => {
          user.hash = await bcrypt.hashSync(user.hash, 8);
        },
      },
      instanceMethods: {
        validatePassword: async function (hash) {
          return await bcrypt.compareSync(hash, this.password);
        }
      }
    });
      Users.associate = function(models) {
      // associations can be defined here
      Users.hasMany(models.Articles, {
        foreignKey: "postedBy"
      });
      Users.hasMany(models.Followers, {
        foreignKey: "follower",
        onDelete: 'CASCADE'
      });
      Users.hasMany(models.Followers, {
        foreignKey: "followee",
        onDelete: 'CASCADE'
      });
    };
  return Users;
};
