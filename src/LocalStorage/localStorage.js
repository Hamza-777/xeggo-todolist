// Register a user
export const registerUser = user => {
    if(userExists(user.email)) {
        return 'User with the email already exists';
    } else {
        if(localStorage.getItem('users')) {
            const userList = JSON.parse(localStorage.getItem('users'));
            userList.push(user);
            localStorage.setItem('users', JSON.stringify(userList));
            return 'User registered successfully';
        } else {
            const userList = [user];
            localStorage.setItem('users', JSON.stringify(userList));
            return 'User registered successfully';
        }
    }
}

// Check if user exists
export const userExists = email => {
    const userList = JSON.parse(localStorage.getItem('users'));

    return userList ? userList.filter(user => user.email === email).length === 1 : false;

}

// Get users
export const getUsers = () => {
    const userList = JSON.parse(localStorage.getItem('users'));

    return userList;

}

// Get user by email
export const getUserByEmail = email => {
    const userList = JSON.parse(localStorage.getItem('users'));

    return userList ? userList.filter(user => user.email === email) : [];

}

// Get user by email
export const getTodosByEmail = email => {
    const userList = JSON.parse(localStorage.getItem('users'));

    const newList = userList.filter(user => user.email === email);

    return newList[0].todoListing;

}

// Login a user
export const loginUser = user => {
    const localUser = getUserByEmail(user.email)[0];
    if(localUser) {
        if(localUser.password === user.password) {
            return ['authorized', user.email];
        } else {
            return ['notauthorized'];
        }
    } else {
        return ['No such user exists'];
    }
}

// Set authorization
export const setAuthorization = (arr) => {
    let authorizationStatus = localStorage.getItem('authorization');
    if(authorizationStatus) {
        authorizationStatus = (arr[0] === 'authorized' ? ['allowed', arr[1]] : ['denied']);
        localStorage.setItem('authorization', JSON.stringify(authorizationStatus));
    } else {
        localStorage.setItem('authorization', JSON.stringify(arr[0] === 'authorized' ? ['allowed', arr[1]] : ['denied']));
    }
}

// Check Authorization
export const checkAuth = () => {
    const item = JSON.parse(localStorage.getItem('authorization'));
    return item[0] === 'allowed' ? true : false;
}

// Update a user
export const updateUser = (email, todo, need) => {
    const userList = getUsers();
    const findUser = userList.map((user, idx) => user.email === email ? 1 : 0);
    const userIdx = findUser.indexOf(1);

    if(need === 'add') {
        userList[userIdx].todoListing.unshift(todo);
    } else {
        userList[userIdx].todoListing = userList[userIdx].todoListing.filter(item => item.id !== todo);
    }
    localStorage.setItem('users', JSON.stringify(userList));
}