import axios from 'axios';
const FormData = require('form-data')
const API_BASE_URL = 'https://locatestudent.com/taskit/api.php';

export const checkUsername = async (username) => {
  try {
    let data = new FormData();
    data.append('type', 'check_username');
    data.append('username', username);

    const response = await axios.post(API_BASE_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      console.log("Server responded with an error");
    } else if (error.request) {
      console.log("Network error, no response received");
    } else {
      console.log(error);
    }
    throw error; // Throw the error to indicate failure
  }
};

export const checkEmail = async (email) => {
  try {
    let data = new FormData();
    data.append('type', 'check_email');
    data.append('email', email);
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  }
  catch (error) {
    if (error.response) {
      console.log(error.response);
      console.log("server responded");
    } else if (error.request) {
      console.log("network error");
    } else {
      console.log(error);
    }
  };
};

export const registerUser = async (username, name, email, password, phone, location) => {

  try {

    let data = new FormData();
    data.append('type', 'register');
    data.append('username', username);
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('phone', phone);
    data.append('location', location);
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(" calling...")
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    if (error.response) {
      console.log(error.response);
      console.log("server responded");
    } else if (error.request) {
      console.log("network error");
    } else {
      console.log(error);
    }
  };
}

export const login = async (email, password) => {
  try {
    let data = new FormData();
    data.append('type', 'login');
    data.append('email', email);
    data.append('password', password);

    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    console.log(" calling...")
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    if (error.response) {
      console.log(error.response);
      console.log("server responded");
    } else if (error.request) {
      console.log("network error");
    } else {
      console.log(error);
    }
  };
}

export const getCategories = async () => {
  let data = new FormData();
  data.append('type', 'get_data');
  data.append('table_name', 'categories');
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getServices = async () => {
  let data = new FormData();
  data.append('type', 'get_data');
  data.append('table_name', 'services');
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};

export const bookService = async (serviceId, bookingTime, userId) => {
  let data = new FormData();
  data.append('type', 'add_data');
  data.append('table_name', 'booking');
  data.append('service_id', serviceId);
  data.append('booking_time', JSON.stringify(bookingTime));
  data.append('user_id', userId);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error('Error booking service:', error);
    throw error;
  }
};

export const get_booking = async (userId) => {
  let data = new FormData();
  data.append('type', 'get_data');
  data.append('table_name', 'booking');
  data.append('user_id', userId);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  }
  catch (error) {
    console.error('Error in getting booking:', error);
    throw error;
  }
}

export const update_status = async (bookigId, status) => {
  let data = new FormData();
  data.append('type', 'update_data');
  data.append('table_name', 'booking');
  data.append('id', bookigId);
  data.append('status', status);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
    return response.data;
  }
  catch (error) {
    console.error('Error in getting booking:', error);
    throw error;
  }
}

export const send_opt = async (phone) => {
  let data = new FormData();
  data.append('type', 'send_otp');
  data.append('phone', phone);
  // data.append('', '');
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error in get OPT', error);
    throw error;
  }

}

export const update_password = async (password, user_id) => {
  let data = new FormData();
  data.append('type', 'update_password');
  data.append('password', password);
  data.append('user_id', user_id);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error in get OPT', error);
    throw error;
  }

}

export const get_unseen_noti = async (uid) => {
  let data = new FormData();
  data.append('type', 'noti_check');
  data.append('user_id', uid);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error in get notification', error);
    throw error;
  }
}

export const get_Notifications = async (uid, user) => {
  let data = new FormData();
  data.append('type', 'get_data');
  data.append('table_name', 'notifications');
  data.append('user_id', uid);
  data.append('user_type', user);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    //console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.error('Error to get notification', error);
    throw error;
  }

}

export const noti_seen = async (uid) => {
  let data = new FormData();
  data.append('type', 'noti_seen');
  data.append('user_id', uid);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error to get notification', error);
    throw error;
  }

}
export const profile = async (uid) => {
  let data = new FormData();
  data.append('type', 'get_data');
  data.append('table_name', 'users');
  data.append('id', uid);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error to get notification', error);
    throw error;
  }

}

export const add_rating = async (rating, review, uid, bookigId) => {
  let data = new FormData();
  data.append('type', 'add_data');
  data.append('table_name', 'reviews');
  data.append('rating', rating);
  data.append('review', review);
  data.append('user_id', uid);
  data.append('booking_id', bookigId);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error to get notification', error);
    throw error;
  }
}

export const change_Password = async(old, new_pass, uid)=> {
  let data = new FormData();
  data.append('type', 'change_password');
  data.append('old_password', old);
  data.append('new_password', new_pass);
  data.append('user_id', uid);
  try {
    const response = await axios.post(API_BASE_URL,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
  catch (error) {
    console.error('Error to get notification', error);
    throw error;
  }
}

export const contact_us=async(title,description,uid)=>{
let data = new FormData();
data.append('type', 'add_data');
data.append('table_name', 'contact_us');
data.append('title', title);
data.append('description', description);
data.append('user_id', uid);
try {
  const response = await axios.post(API_BASE_URL,
    data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}
catch (error) {
  console.error('Error to get notification', error);
  throw error;
}
}