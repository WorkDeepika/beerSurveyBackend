const mongoose = require("mongoose");
// Class
// : 
// "3"
// ISEC
// : 
// "Upper Middle"
// "c"
// Q28a
// : 
// "b"
// Q30
// : 
// "13.1"
// Q31
// : 
// "6"
// Q32
// : 
// "5"

// score
// : 
// 7
const dataSchema = new mongoose.Schema(
  {
    email: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    latitude1: { type: Number, default: null },
    longitude1: { type: Number, default: null },
    startDate: { type: String, default: null }, // could be Date if you parse it
    startTime: { type: String, default: null },
    backST: { type: String, default: null },
    backSD: { type: String, default: null },
    city: { type: String, default: null },
    contact: { type: Number, default: null },
    name: { type: String, default: null },
    address: { type: String, default: null },
    interviewerName: { type: String, default: null },
    interviewerId: { type: String, default: null },
    language: { type: String, default: null },

    // Questions
    Q1: { type: String, default: null },
    Q2: { type: String, default: null },
    Q3: { type: String, default: null },
    Q4: { type: String, default: null },
    psuId:{ type: String, default: null },
    Q4_1:{ type: String, default: null },
    Q4_2:{ type: String, default: null },
    Q4_3:{ type: String, default: null },
    Q4_4:{ type: String, default: null },
    Q4_5:{ type: String, default: null },
    Q4_6:{ type: String, default: null },
    Q4_7:{ type: String, default: null },
    Q5: { type: String, default: null },
    Q6: { type: String, default: null },
    Q7: { type: String, default: null },
    Q8: { type: String, default: null },
    Q9: { type: String, default: null },
    Q10: { type: String, default: null },
    Q11: { type: [String], default: [] },
    NCCS: { type: String, default: null },
    Q12: { type: String, default: null },
    Q13: { type: String, default: null },
    Q14: { type: [String], default: [] },
    Q15: { type: String, default: null },
    Q16a: { type: String, default: null },
    Q16b: { type: String, default: null },
    Q16c: { type: String, default: null },
    Q16d: { type: String, default: null },
    Q16e: { type: String, default: null },
    Q16f: { type: String, default: null },
    Q17: { type: String, default: null },
    Q18: { type: String, default: null },
    Q19: { type: String, default: null },
    Q20: { type: String, default: null },
    Q21: { type: String, default: null },
    Q22a: { type: String, default: null },
    Q22b: { type: String, default: null },
    Q22c: { type: String, default: null },
    Q22d: { type: String, default: null },
    Q22e: { type: String, default: null },
    Q22f: { type: String, default: null },
    Q22g: { type: String, default: null },
    Q23: { type: [String], default: [] },
    Q24: { type: [String], default: [] },
    Q25: { type: [String], default: [] },
    Qconsent: { type: String, default: null },
    Q26: { type: String, default: null },
    Q27: { type: String, default: null },
    Q28: { type: String, default: null },
    Q29: { type: String, default: null },
    Class: { type: String, default: null },
    ISEC: { type: String, default: null },
    Q28a: { type: String, default: null },
    Q30: { type: String, default: null },
    Q31: { type: String, default: null },
    Q32: { type: String, default: null },
    score: { type: Number, default: null },
    // end details
    endTime: { type: String, default: null },
    endDate: { type: String, default: null },
    duration: { type: String, default: null },
    backET: { type: String, default: null },
    backED: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);

const DataModel = mongoose.model("Data", dataSchema);

module.exports = { DataModel };
// {
//   "email": "admin",
//   "latitude": 18.5211,
//   "longitude": 73.8502,
//   "startDate": "30/07/2025",
//   "startTime": "1:28:49 PM",
//   "backST": "1:28:50 PM",
//   "backSD": "30/07/2025",
//   "city": "Mumbai",
//   "contact": 2323232323,
//   "name": "test1",
//   "address": "23",
//   "interviewerName": "323",
//   "interviewerId": "3232",
//   "language": "en",
//   "Q1": "a",
//   "Q2": "23",
//   "Q3": "3233232",
//   "Q4": "2323",
//   "Q5": "323",
//   "Q6": "32",
//   "Q7": "a",
//   "Q8": "c",
//   "Q9": "d",
//   "Q10": "5",
//   "Q11": [
//       "5",
//       "4",
//       "3",
//       "2"
//   ],
//   "NCCS": "C1",

//   "Q12": "a",
//   "Q13": "c",
//   "Q14": [
//       "d",
//       "b",
//       "c"
//   ],
//   "Q15": "c",
//   "Q16b": "2",
//   "Q16a": "1",
//   "Q16c": "3",
//   "Q16d": "4",
//   "Q16e": "5",
//   "Q16f": "5",
//   "Q17": "a",
//   "Q18": "b",
//   "Q19": "b",
//   "Q20": "a",
//   "Q21": "c",
//   "Q22a": "1",
//   "Q22b": "2",
//   "Q22c": "3",
//   "Q22d": "4",
//   "Q22e": "5",
//   "Q22f": "5",
//   "Q22g": "5",
//   "Q23": [
//       "h",
//       "e",
//       "k",
//       "n"
//   ],
//   "Q24": [
//       "d",
//       "b"
//   ],
//   "Q25": [
//       "c",
//       "d"
//   ],
//   "Qconsent": "a",
//   "Q26": "c",
//   "Q27": "a",
//   "Q28": "d",
//   "endTime": "1:31:27 PM",
//   "endDate": "30/07/2025",
//   "duration": "00:02:38",
//   "backET": "1:31:28 PM",
//   "backED": "30/07/2025"
// }