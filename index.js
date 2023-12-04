const express = require('express');
const app = express();
const port = 3180;
var cors = require('cors');
app.use(cors());

const postData = [
    {
      "id": "01399764-8ff5-43ae-8770-cde92173a47a",
      "creator": {
        "id": "7a217ece-92ed-4c45-b7d1-64f799574fec",
        "displayName": "Georgie Underwood",
        "nickName": "GUnderwood",
        "avatarURL": "/api/content/fc7850f5-8eed-4d98-b6ff-4b995aca1674.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Derby, United Kingdom",
        "__typename": "Location"
      },
      "from": {
        "name": "Kalsot",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/359f5231-634c-42dc-87da-66cd3b4ee326.jpg",
        "thumbnailSrc": "/api/content/f3e683c0-d567-4699-8e8d-ca9670bfe101.jpg",
        "alt": "jowmaragveedozomegjedroipiaj",
        "__typename": "Photo"
      },
      "text": "Do one thing every day that scares you. ",
      "createdOn": "Sat Jul 08 2023 11:55:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "01399764-8ff5-43ae-8770-cde92173a47a",
        "views": 9,
        "likes": 1,
        "dislikes": 0,
        "replies": 1,
        "repeats": 0,
        "saves": 1,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "101d2e4f-a22b-435c-bfec-9d77b418052e",
      "creator": {
        "id": "1715a094-e20f-4ba4-81fa-364becde3aa2",
        "displayName": "Bertie Garrett",
        "nickName": "bertie_garrett",
        "avatarURL": "/api/content/02b24d2f-0216-4747-bc38-06a62effe5fa.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Derby, United Kingdom",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/53eda190-0e80-42ab-83db-d6fa7c6e4791.jpg",
        "thumbnailSrc": "/api/content/bf3a98c5-f7bd-48e4-bf35-b3072a07602b.jpg",
        "alt": "nabravcejpafhigenrigbemcessunseogeulijihuihinijajulperbajerwupteclimuekocejodimloron",
        "__typename": "Photo"
      },
      "text": "Appreciation can make a day, even change a life. Your willingness to put it into words is all that is necessary. ",
      "createdOn": "Sat Jul 08 2023 12:01:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "101d2e4f-a22b-435c-bfec-9d77b418052e",
        "views": 4,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "1112a34a-f10c-4926-a799-1b1699022de5",
      "creator": {
        "id": "4b1151b0-2cea-4c34-beac-833921a988d9",
        "displayName": "Gilbert Jordan",
        "nickName": "GilbertJ",
        "avatarURL": "/api/content/4abab92c-6fa3-4465-995a-be9b0964449f.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Pian",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/bfd71304-2ddd-4f39-9eb0-4e926c7719cc.jpg",
        "thumbnailSrc": "/api/content/303b2831-1939-4999-8a11-7918a3e4eb24.jpg",
        "alt": "tomafocupzanfamne",
        "__typename": "Photo"
      },
      "text": "To go against the dominant thinking of your friends, of most of the people you see every day, is perhaps the most difficult act of heroism you can perform. ",
      "createdOn": "Sat Jul 08 2023 11:58:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sat Jul 08 2023 11:58:07 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "1112a34a-f10c-4926-a799-1b1699022de5",
        "views": 4,
        "likes": 1,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "wide",
          "__typename": "Tag"
        },
        {
          "slug": "tuhed",
          "__typename": "Tag"
        },
        {
          "slug": "wemlinepo",
          "__typename": "Tag"
        },
        {
          "slug": "igdaib",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "24e9d6ea-2c73-4ee2-8169-f49006d67ba1",
      "creator": {
        "id": "36bcd6cb-4cce-4f86-88f3-18c061866ec8",
        "displayName": "Francis Santos",
        "nickName": "FSantos",
        "avatarURL": "/api/content/191b888c-49ef-4030-806f-0a31ec4ed900.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/032e64a0-92a1-4a60-9eda-08f11d77a74d.jpg",
        "thumbnailSrc": "/api/content/baa7a768-8d79-4186-9ae7-e7b5f488156c.jpg",
        "alt": "mulinivacavecetgivkinluhigmutez",
        "__typename": "Photo"
      },
      "text": "Never mistake activity for achievement.  ",
      "createdOn": "Sat Jul 08 2023 11:56:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sat Jul 08 2023 11:56:07 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "24e9d6ea-2c73-4ee2-8169-f49006d67ba1",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "cip",
          "__typename": "Tag"
        },
        {
          "slug": "opitiz",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "58b06a40-2c55-475b-a061-014dbcf34e29",
      "creator": {
        "id": "1d04fca0-9082-43cb-a037-5a4e3781cf0f",
        "displayName": "Trevor Lynch",
        "nickName": "TrevorLynch",
        "avatarURL": "/api/content/5945a956-73e1-47db-b885-c218a0665707.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Raub District, Malaysia",
        "__typename": "Location"
      },
      "from": {
        "name": "Lakhanwal Khas, Pakistan",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/280ae68f-0ba8-4122-a62e-2c68e1f5b0b0.jpg",
        "thumbnailSrc": "/api/content/1533eb7d-7a58-4abb-ac57-d178b332ebbb.jpg",
        "alt": "gihaledunecsicopzoruwibiluhdezicbimsuamibebdawsomtagvihzigvazemugdoerojolinep",
        "__typename": "Photo"
      },
      "text": "No one who achieves success does so without the help of others. The wise and confident acknowledge this help with gratitude. ",
      "createdOn": "Sat Jul 08 2023 11:52:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "58b06a40-2c55-475b-a061-014dbcf34e29",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "720443a9-3275-4990-af53-481d1177015f",
      "creator": {
        "id": "34c756b3-7324-4922-b19f-c4afc587cc82",
        "displayName": "Helen Reeves",
        "nickName": "HelenR",
        "avatarURL": "/api/content/22f703ff-f316-45cd-9d70-abbf65a94e34.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/a3b66689-bfa3-441e-a82a-a1687b8e470b.jpg",
        "thumbnailSrc": "/api/content/56ad1683-751c-4084-a182-5245e29d5859.jpg",
        "alt": "pugikturegulemuviskut",
        "__typename": "Photo"
      },
      "text": "The most successful people are those who are good at plan B. ",
      "createdOn": "Sat Jul 08 2023 12:00:10 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sat Jul 08 2023 12:00:10 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "720443a9-3275-4990-af53-481d1177015f",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "95b92d39-4cfc-4445-aee4-d8db05ab23f2",
      "creator": {
        "id": "888115b2-a44a-494f-9f6c-998292fe7147",
        "displayName": "Jack Munoz",
        "nickName": "JackMunoz",
        "avatarURL": "/api/content/a9d8e85e-5a93-4fdf-b93a-0a4f74a843dc.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/70f77706-323d-44dc-a4f4-ef79b98a3f30.jpg",
        "thumbnailSrc": "/api/content/8052d3f7-8bb7-4ef0-b5ef-873f52243e96.jpg",
        "alt": "ipoipeucorantajebmac",
        "__typename": "Photo"
      },
      "text": "Strong beliefs win strong men, and then make them stronger.  ",
      "createdOn": "Sat Jul 08 2023 11:57:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sat Jul 08 2023 11:57:07 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "95b92d39-4cfc-4445-aee4-d8db05ab23f2",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "batdozov",
          "__typename": "Tag"
        },
        {
          "slug": "kuguza",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "9f554c34-5169-4d50-a935-feb48c30773d",
      "creator": {
        "id": "1715a094-e20f-4ba4-81fa-364becde3aa2",
        "displayName": "Bertie Garrett",
        "nickName": "bertie_garrett",
        "avatarURL": "/api/content/02b24d2f-0216-4747-bc38-06a62effe5fa.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Karak, Malaysia",
        "__typename": "Location"
      },
      "from": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/8c775ce9-5997-417f-83fd-a3dccca9a4db.jpg",
        "thumbnailSrc": "/api/content/db266eaf-c06f-47cd-97e3-8dcead74429c.jpg",
        "alt": "colanivwamakowebaabwupoutziluzhecfuafuvolibukeznukdavopipezeate",
        "__typename": "Photo"
      },
      "text": "The day is already blessed, find peace within it.",
      "createdOn": "Sat Jul 08 2023 11:53:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "9f554c34-5169-4d50-a935-feb48c30773d",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "huvfeked",
          "__typename": "Tag"
        },
        {
          "slug": "buelowat",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "d394b212-87a3-4c98-b038-0272db6f229b",
      "creator": {
        "id": "7a217ece-92ed-4c45-b7d1-64f799574fec",
        "displayName": "Georgie Underwood",
        "nickName": "GUnderwood",
        "avatarURL": "/api/content/fc7850f5-8eed-4d98-b6ff-4b995aca1674.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Edge of Nowhere",
        "__typename": "Location"
      },
      "from": {
        "name": "Karak, Malaysia",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/41a40d4f-d3a7-4d04-89fc-e8006ac50023.jpg",
        "thumbnailSrc": "/api/content/516403aa-0692-4164-9e10-886de6d15652.jpg",
        "alt": "ahnulokitatizipebwamanpiizsiklinmajiwkopagafohekidwivnaovrewnadwojwo",
        "__typename": "Photo"
      },
      "text": "Make the most of yourself, for that is all there is of you. ",
      "createdOn": "Sat Jul 08 2023 11:59:07 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "d394b212-87a3-4c98-b038-0272db6f229b",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "vebcu",
          "__typename": "Tag"
        },
        {
          "slug": "pen",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    },
    {
      "id": "f0e2dc82-5e4e-42dc-b5b3-2162ff7b788a",
      "creator": {
        "id": "5cd0104d-e42b-47ea-b0f2-9e0f0b7bf510",
        "displayName": "Mujeeb",
        "nickName": "Wallis & Futuna-coral-Neysa",
        "avatarURL": "/api/content/00b429b0-ffe7-4304-8eb0-44903da314ed.jpg",
        "__typename": "User"
      },
      "status": "PUBLISHED",
      "to": {
        "name": "Tarherdi, Pakistan",
        "__typename": "Location"
      },
      "from": {
        "name": "Temerloh, Malaysia",
        "__typename": "Location"
      },
      "photo": {
        "mainSrc": "/api/content/8f264ea0-3f10-4607-be3d-879b25e5949d.jpg",
        "thumbnailSrc": "/api/content/81eacefc-fd50-408b-b6d7-6de9fcaf2ce9.jpg",
        "alt": "wuwuzurebpiwafjirtugiisavilagandekimocewfifruregcowowatheumokuanw",
        "__typename": "Photo"
      },
      "text": "If you have no respect for your own values how can you be worthy of respect from others. ",
      "createdOn": "Sat Jul 08 2023 12:04:06 GMT+0000 (Coordinated Universal Time)",
      "updatedOn": "Sun Oct 15 2023 16:23:26 GMT+0000 (Coordinated Universal Time)",
      "statistics": {
        "id": "f0e2dc82-5e4e-42dc-b5b3-2162ff7b788a",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "replies": 0,
        "repeats": 0,
        "saves": 0,
        "flags": 0,
        "state": "NEITHER",
        "hasReplied": false,
        "hasRepeated": false,
        "hasSaved": false,
        "hasFlagged": false,
        "__typename": "PostStatistics"
      },
      "tags": [
        {
          "slug": "his",
          "__typename": "Tag"
        },
        {
          "slug": "litfa",
          "__typename": "Tag"
        },
        {
          "slug": "la",
          "__typename": "Tag"
        }
      ],
      "parent": null,
      "__typename": "Post"
    }
  ];

  app.get('/getpostdata',(req,res)=>{
        res.send(JSON.parse(JSON.stringify(postData)))
  })

app.get('/',(req,res)=>{
    res.send('Hello Wajahat!!');
})

app.listen(port,()=>{
    console.log('Express App Running!!');
})

