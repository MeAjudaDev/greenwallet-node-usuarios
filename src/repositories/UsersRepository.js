const users = [];

exports.create = async ({ name, email, password }) => {
    const user = {
        name,
        email,
        password
    }

    await users.push(user);
    console.log(users);
}