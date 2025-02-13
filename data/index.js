export const images = [
  "https://images.unsplash.com/photo-1610235554447-41505d7962f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80",
  "https://images.unsplash.com/photo-1610212594948-370947a3ba0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1610155180433-9994da6a323b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
];

export const homeItems = [
  {
    title: "Exploring Maui",
    type: "Blog",
    text: "We just got back from a trip to Maui, and we had a great time...",
    author: "Max Lynch",
    authorAvatar: "/img/max.jpg",
    image: images[0],
  },
  {
    title: "Arctic Adventures",
    type: "Blog",
    text:
      "Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...",
    author: "Max Lynch",
    authorAvatar: "/img/max.jpg",
    image: images[1],
  },
  {
    title: "Frolicking in the Faroe Islands",
    type: "Blog",
    text:
      "The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...",
    author: "Max Lynch",
    authorAvatar: "/img/max.jpg",
    image: images[2],
  },
];

export const notifications = [
  { title: "New friend request", when: "6 hr" },
  { title: "Please change your password", when: "1 day" },
  { title: "You have a new message", when: "2 weeks" },
  { title: "Welcome to the app!", when: "1 month" },
];

// Some fake lists
export const lists = [
  {
    name: "Groceries",
    id: "groceries",
    items: [
      { name: "Apples" },
      { name: "Bananas" },
      { name: "Milk" },
      { name: "Ice Cream" },
    ],
  },
  {
    name: "Hardware Store",
    id: "hardware",
    items: [
      { name: "Circular Saw" },
      { name: "Tack Cloth" },
      { name: "Drywall" },
      { name: "Router" },
    ],
  },
  {
    name: "Work",
    id: "work",
    items: [{ name: "TPS Report" }, { name: "Set up email" }],
  },
  { name: "Reminders", id: "reminders" },
];
