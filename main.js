// Sample input data
const data = [
  {
    my_data: [
      {
        her_data: [
          {
            get_me_out: { status: true },
            get_you_out: { status: false },
          },
        ],
        his_data: [
          {
            get_me_out: { status: false },
            get_you_out: { status: false },
          },
        ],
      },
      {
        her_data: [
          {
            get_me_out: { status: false },
            get_you_out: { status: false },
          },
        ],
        his_data: [
          {
            get_me_out: { status: true },
            get_you_out: { status: false },
          },
        ],
      },
    ],
  },
  {
    my_data: [
      {
        her_data: [
          {
            get_me_out: { status: false },
            get_you_out: { status: true },
          },
        ],
        his_data: [
          {
            get_me_out: { status: true },
            get_you_out: { status: false },
          },
        ],
      },
    ],
  },
];

// Function to filter objects based on the status
const filterByStatus = (obj, status) => {
  if (obj.hasOwnProperty("status")) {
    return obj.status === status ? obj : null;
  }

  const filteredObj = {};

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      const filteredArray = obj[key]
        .map((item) => filterByStatus(item, status))
        .filter((item) => item !== null);

      if (filteredArray.length > 0) {
        filteredObj[key] = filteredArray;
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const nestedFilteredObj = filterByStatus(obj[key], status);
      if (nestedFilteredObj && Object.keys(nestedFilteredObj).length > 0) {
        filteredObj[key] = nestedFilteredObj;
      }
    }
  }

  return Object.keys(filteredObj).length > 0 ? filteredObj : null;
};

// Main function to execute the solution
const solution = (payload, status) => {
  return payload
    .map((item) => filterByStatus(item, status))
    .filter((item) => item !== null);
};

// Execute the solution with the input data and status true
console.log(JSON.stringify(solution(data, true), null, 2));
