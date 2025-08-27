const mongoose = require("mongoose");
const DataModel = require("../models/dataModel"); // adjust path to your model

// Controller function
// const getDataTable = async (req, res) => {
//   try {
//     const { panel } = req.query; // optional: /api/data?panel=Tuborg Green (TBG)

//     const brandMap = {
//       "1": "Tuborg Green",
//       "2": "Kingfisher Premium",
//       "3": "Carlsberg Elephant",
//       "4": "Tuborg Classic",
//       "5": "Budweiser Magnum",
//       "6": "Kingfisher Ultra Max",
//       "7": "Carlsberg Smooth",
//       "8": "Tuborg Ice Draft",
//       "9": "Budweiser Mild",
//       "10": "Kingfisher Ultra",
//       "11": "Heineken",
//       "12": "1664 Blanc",
//       "13": "Corona",
//       "14": "Hoegaarden",
//       "15": "None of the above",
//     };

//     const matchStage = {};
//     if (panel) matchStage.RecruitmentPanel = panel;

//     const results = await DataModel.aggregate([
//       { $match: matchStage },

//       { $addFields: { ageNum: { $toInt: "$QRQ5" } } },

//       {
//         $group: {
//           _id: "$QRQ2",
//           total: { $sum: 1 },

//           // NCCS
//           countA: {
//             $sum: { $cond: [{ $regexMatch: { input: "$NCCS", regex: /^A/i } }, 1, 0] },
//           },
//           countB: {
//             $sum: { $cond: [{ $regexMatch: { input: "$NCCS", regex: /^B/i } }, 1, 0] },
//           },

//           // Language
//           countEnglish: { $sum: { $cond: [{ $eq: ["$Language", "en"] }, 1, 0] } },
//           countHindi: { $sum: { $cond: [{ $eq: ["$Language", "hi"] }, 1, 0] } },

//           // Age buckets
//           age_21_24: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 21] }, { $lte: ["$ageNum", 24] }] }, 1, 0] } },
//           age_25_30: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 25] }, { $lte: ["$ageNum", 30] }] }, 1, 0] } },
//           age_31_35: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 31] }, { $lte: ["$ageNum", 35] }] }, 1, 0] } },
//           age_36_40: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 36] }, { $lte: ["$ageNum", 40] }] }, 1, 0] } },
//           net_21_30: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 21] }, { $lte: ["$ageNum", 30] }] }, 1, 0] } },
//           net_31_40: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 31] }, { $lte: ["$ageNum", 40] }] }, 1, 0] } },

//           // collect all QRQ11 arrays for this group (array of arrays)
//           rq11All: { $push: "$QRQ11" },
//         },
//       },

//       // flatten the array-of-arrays into one array (works when QRQ11 is array or empty)
//       {
//         $addFields: {
//           brandIdsFlattened: {
//             $reduce: {
//               input: "$rq11All",
//               initialValue: [],
//               in: { $concatArrays: ["$$value", { $ifNull: ["$$this", []] }] },
//             },
//           },
//         },
//       },

//       // project final fields we need (brandIdsFlattened may be empty)
//       {
//         $project: {
//           _id: 0,
//           QRQ2: "$_id",
//           total: 1,
//           NCCS: { A: "$countA", B: "$countB" },
//           Language: { English: "$countEnglish", Hindi: "$countHindi" },
//           Age: {
//             "21-24": "$age_21_24",
//             "25-30": "$age_25_30",
//             "31-35": "$age_31_35",
//             "36-40": "$age_36_40",
//             "NET 21-30": "$net_21_30",
//             "NET 31-40": "$net_31_40",
//           },
//           brandIdsFlattened: 1,
//         },
//       },
//     ]);

//     // Map brand IDs -> counts and convert to desired RQ11 array
//     const finalResults = results.map((row) => {
//       // row.brandIdsFlattened is an array of brand ids (strings or numbers)
//       const counts = {};
//       (row.brandIdsFlattened || []).forEach((bid) => {
//         if (bid === null || bid === undefined) return;
//         const key = String(bid);
//         counts[key] = (counts[key] || 0) + 1;
//       });

//       // build RQ11 array: brand name + count, include only brands with count>0, sorted desc
//       const rq11Arr = Object.entries(counts)
//         .map(([id, count]) => ({
//           brand: brandMap[id] || id,
//           count,
//         }))
//         .filter((b) => b.count > 0)
//         .sort((a, b) => b.count - a.count);

//       return {
//         QRQ2: row.QRQ2,
//         total: row.total,
//         NCCS: row.NCCS,
//         Language: row.Language,
//         Age: row.Age,
//         RQ11: rq11Arr,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       totalUnique: finalResults.length,
//       data: finalResults,
//     });
//   } catch (error) {
//     console.error("Error fetching data table:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };


// const getDataTable = async (req, res) => {
//   try {
//     const { panel } = req.query; // optional filter

//     const brandMap = {
//       "1": "Tuborg Green",
//       "2": "Kingfisher Premium",
//       "3": "Carlsberg Elephant",
//       "4": "Tuborg Classic",
//       "5": "Budweiser Magnum",
//       "6": "Kingfisher Ultra Max",
//       "7": "Carlsberg Smooth",
//       "8": "Tuborg Ice Draft",
//       "9": "Budweiser Mild",
//       "10": "Kingfisher Ultra",
//       "11": "Heineken",
//       "12": "1664 Blanc",
//       "13": "Corona",
//       "14": "Hoegaarden",
//       "15": "None of the above",
//     };

//     const matchStage = {};
//     if (panel) matchStage.RecruitmentPanel = panel;

//     const results = await DataModel.aggregate([
//       { $match: matchStage },

//       { $addFields: { ageNum: { $toInt: "$QRQ5" } } },

//       {
//         $group: {
//           _id: "$QRQ2",
//           total: { $sum: 1 },

//           // NCCS
//           countA: {
//             $sum: { $cond: [{ $regexMatch: { input: "$NCCS", regex: /^A/i } }, 1, 0] },
//           },
//           countB: {
//             $sum: { $cond: [{ $regexMatch: { input: "$NCCS", regex: /^B/i } }, 1, 0] },
//           },

//           // Language
//           countEnglish: { $sum: { $cond: [{ $eq: ["$Language", "en"] }, 1, 0] } },
//           countHindi: { $sum: { $cond: [{ $eq: ["$Language", "hi"] }, 1, 0] } },

//           // Age buckets
//           age_21_24: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 21] }, { $lte: ["$ageNum", 24] }] }, 1, 0] } },
//           age_25_30: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 25] }, { $lte: ["$ageNum", 30] }] }, 1, 0] } },
//           age_31_35: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 31] }, { $lte: ["$ageNum", 35] }] }, 1, 0] } },
//           age_36_40: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 36] }, { $lte: ["$ageNum", 40] }] }, 1, 0] } },
//           net_21_30: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 21] }, { $lte: ["$ageNum", 30] }] }, 1, 0] } },
//           net_31_40: { $sum: { $cond: [{ $and: [{ $gte: ["$ageNum", 31] }, { $lte: ["$ageNum", 40] }] }, 1, 0] } },

//           // Collect all brand arrays
//           rq11All: { $push: "$QRQ11" },
//           rq11aAll: { $push: "$QRQ11A" },
//           rq12All: { $push: "$QRQ12" },
//           rq13All: { $push: "$QRQ13" },
//         },
//       },

//       // Flatten them
//       {
//         $addFields: {
//           brandIdsQRQ11: {
//             $reduce: {
//               input: "$rq11All",
//               initialValue: [],
//               in: {
//                 $concatArrays: [
//                   "$$value",
//                   { $cond: [{ $isArray: "$$this" }, "$$this", []] }
//                 ]
//               }
//             }
//           },
//           brandIdsQRQ11A: {
//             $reduce: {
//               input: "$rq11aAll",
//               initialValue: [],
//               in: {
//                 $concatArrays: [
//                   "$$value",
//                   { $cond: [{ $isArray: "$$this" }, "$$this", []] }
//                 ]
//               }
//             }
//           },
//           brandIdsQRQ12: {
//             $reduce: {
//               input: "$rq12All",
//               initialValue: [],
//               in: {
//                 $concatArrays: [
//                   "$$value",
//                   { $cond: [{ $isArray: "$$this" }, "$$this", []] }
//                 ]
//               }
//             }
//           },
//           brandIdsQRQ13: {
//             $reduce: {
//               input: "$rq13All",
//               initialValue: [],
//               in: {
//                 $concatArrays: [
//                   "$$value",
//                   { $cond: [{ $isArray: "$$this" }, "$$this", []] }
//                 ]
//               }
//             }
//           }
//         }
//       },

//       {
//         $project: {
//           _id: 0,
//           QRQ2: "$_id",
//           total: 1,
//           NCCS: { A: "$countA", B: "$countB" },
//           Language: { English: "$countEnglish", Hindi: "$countHindi" },
//           Age: {
//             "21-24": "$age_21_24",
//             "25-30": "$age_25_30",
//             "31-35": "$age_31_35",
//             "36-40": "$age_36_40",
//             "NET 21-30": "$net_21_30",
//             "NET 31-40": "$net_31_40",
//           },
//           brandIdsQRQ11: 1,
//           brandIdsQRQ11A: 1,
//           brandIdsQRQ12: 1,
//           brandIdsQRQ13: 1,
//         },
//       },
//     ]);

//     // helper to build brand array
//     const buildBrandCounts = (ids) => {
//       const counts = {};
//       (ids || []).forEach((bid) => {
//         if (!bid) return;
//         const key = String(bid);
//         counts[key] = (counts[key] || 0) + 1;
//       });
//       return Object.entries(counts)
//         .map(([id, count]) => ({ brand: brandMap[id] || id, count }))
//         .filter((b) => b.count > 0)
//         .sort((a, b) => b.count - a.count);
//     };

//     const finalResults = results.map((row) => ({
//       QRQ2: row.QRQ2,
//       total: row.total,
//       NCCS: row.NCCS,
//       Language: row.Language,
//       Age: row.Age,
//       RQ11: buildBrandCounts(row.brandIdsQRQ11),
//       RQ11A: buildBrandCounts(row.brandIdsQRQ11A),
//       RQ12: buildBrandCounts(row.brandIdsQRQ12),
//       RQ13: buildBrandCounts(row.brandIdsQRQ13),
//     }));

//     return res.status(200).json({
//       success: true,
//       totalUnique: finalResults.length,
//       data: finalResults,
//     });
//   } catch (error) {
//     console.error("Error fetching data table:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };
const dashboredExtra = async (req, res) => {
  try {
    const panels = [
      "Tuborg Green (TBG)",
      "Carlsberg Elephant (CBE)",
      "Tuborg Classic (TBC)",
      "Carlsberg Smooth (CBS)",
      "Tuborg Ice Draft (TBI)",
      "1664 Blanc (BLC)"
    ];

    const brandMap = {
      "1": "Tuborg Green",
      "2": "Kingfisher Premium",
      "3": "Carlsberg Elephant",
      "4": "Tuborg Classic",
      "5": "Budweiser Magnum",
      "6": "Kingfisher Ultra Max",
      "7": "Carlsberg Smooth",
      "8": "Tuborg Ice Draft",
      "9": "Budweiser Mild",
      "10": "Kingfisher Ultra",
      "11": "Heineken",
      "12": "1664 Blanc",
      "13": "Corona",
      "14": "Hoegaarden",
      "15": "None of the above",
    };

    // helper to build brand array
    const buildBrandCounts = (ids) => {
      const counts = {};
      (ids || []).forEach((bid) => {
        if (!bid) return;
        const key = String(bid);
        counts[key] = (counts[key] || 0) + 1;
      });
      return Object.entries(counts)
        .map(([id, count]) => ({ brand: brandMap[id] || id, count }))
        .filter((b) => b.count > 0)
        .sort((a, b) => b.count - a.count);
    };

    const panelResults = [];

    for (const panel of panels) {
      const docs = await DataModel.aggregate([
        { $match: { RecruitmentPanel: panel } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            rq11All: { $push: "$QRQ11" },
            rq11aAll: { $push: "$QRQ11A" },
            rq12All: { $push: "$QRQ12" },
            rq13All: { $push: "$QRQ13" },
            rq14All: { $push: "$QRQ14" }  
          },
        },
        {
          $addFields: {
            brandIdsQRQ11: {
              $reduce: {
                input: "$rq11All",
                initialValue: [],
                in: { $concatArrays: ["$$value", { $cond: [{ $isArray: "$$this" }, "$$this", []] }] }
              }
            },
            brandIdsQRQ11A: {
              $reduce: {
                input: "$rq11aAll",
                initialValue: [],
                in: { $concatArrays: ["$$value", { $cond: [{ $isArray: "$$this" }, "$$this", []] }] }
              }
            },
            brandIdsQRQ12: {
              $reduce: {
                input: "$rq12All",
                initialValue: [],
                in: { $concatArrays: ["$$value", { $cond: [{ $isArray: "$$this" }, "$$this", []] }] }
              }
            },
            brandIdsQRQ13: {
              $reduce: {
                input: "$rq13All",
                initialValue: [],
                in: { $concatArrays: ["$$value", { $cond: [{ $isArray: "$$this" }, "$$this", []] }] }
              }
            },
            brandIdsQRQ14: {
              $map: {
                input: "$rq14All",
                as: "val",
                in: "$$val"
              }
            }            
          },
        },
      ]);

      if (docs.length > 0) {
        const row = docs[0];
        panelResults.push({
          panel,
          total: row.total,
          RQ11: buildBrandCounts(row.brandIdsQRQ11),
          RQ11A: buildBrandCounts(row.brandIdsQRQ11A),
          RQ12: buildBrandCounts(row.brandIdsQRQ12),
          RQ13: buildBrandCounts(row.brandIdsQRQ13),
          RQ14 : buildBrandCounts(row.brandIdsQRQ14)
        });
      }
    }

    return res.status(200).json({
      success: true,
      totalPanels: panelResults.length,
      data: panelResults,
    });
  } catch (error) {
    console.error("Error fetching data table:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {   dashboredExtra};