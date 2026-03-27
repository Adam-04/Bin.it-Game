// --- BIN IMAGES ---
import blackBinClosed from "../images/trashCans/blackBinClosed.png";
import blackBinOpen from "../images/trashCans/blackBinOpen.png";
import blueBinClosed from "../images/trashCans/blueBinClosed.png";
import blueBinOpen from "../images/trashCans/blueBinOpen.png";
import greenBinClosed from "../images/trashCans/greenBinClosed.png";
import greenBinOpen from "../images/trashCans/greenBinOpen.png";
import hazardBinClosed from "../images/trashCans/specialBinClosed.png";
import hazardBinOpen from "../images/trashCans/specialBinOpen.png";

// --- TRASH ITEM IMAGES ---
import styrofoam from "../images/garbageImages/trash/styrofoamPlate.png";
import babyWipes from "../images/garbageImages/trash/babyWipes.png";
import brick from "../images/garbageImages/trash/brickAndTextiles.png";
import clinicalMask from "../images/garbageImages/trash/clinicalMask.png";
import diaper from "../images/garbageImages/trash/diaper.png";
import fastFoodCup from "../images/garbageImages/trash/disposableFastfoodCup.png";
import garbageBag from "../images/garbageImages/trash/garbageBag.png";
import sponges from "../images/garbageImages/trash/sponges.png";
import toothpaste from "../images/garbageImages/trash/toothpaste.png";
import waterhose from "../images/garbageImages/trash/waterHose.png";

// --- RECYCLING ITEM IMAGES ---
import glassBottle from "../images/garbageImages/recycling/glassJar.png";
import paper from "../images/garbageImages/recycling/crumpledPaper.png";
import plasticBottle from "../images/garbageImages/recycling/plasticBottle.png";
import cardboardBox from "../images/garbageImages/recycling/cardboardBox.png";
import detergentBottle from "../images/garbageImages/recycling/detergentBottle.png";
import eggCarton from "../images/garbageImages/recycling/eggCartoon.png";
import foilTray from "../images/garbageImages/recycling/foilTray.png";
import foodCan from "../images/garbageImages/recycling/foodCan.png";
import newsPaper from "../images/garbageImages/recycling/newspaper.png";
import wineBottle from "../images/garbageImages/recycling/wineBottle.png";

// --- COMPOST ITEM IMAGES ---
import appleCore from "../images/garbageImages/compost/appleCore.png";
import bananaPeel from "../images/garbageImages/compost/bananaPeel.png";
import coffeeGrounds from "../images/garbageImages/compost/coffeeGrounds.png";
import deadLeaves from "../images/garbageImages/compost/deadLeaves.png";
import eggShells from "../images/garbageImages/compost/eggshells.png";
import friedChickenBones from "../images/garbageImages/compost/friedChickenBones.png";
import leftoverTakeout from "../images/garbageImages/compost/leftoverTakeout.png";
import moldyCheese from "../images/garbageImages/compost/moldyCheese.png";
import oldFlowers from "../images/garbageImages/compost/oldFlowers.png";
import yardRemains from "../images/garbageImages/compost/yardRemains.png";

// --- HAZARDOUS ITEM IMAGES ---
import paintCan from "../images/garbageImages/special/paintBucket.png";
import battery from "../images/garbageImages/special/batteries.png";
import laptop from "../images/garbageImages/special/brokenLaptop.png";
import phone from "../images/garbageImages/special/brokenPhone.png";
import carBattery from "../images/garbageImages/special/carBattery.png";
import gasCylinder from "../images/garbageImages/special/gasCylinder.png";
import lightbulb from "../images/garbageImages/special/lightbulb.png";
import motorOil from "../images/garbageImages/special/motorOil.png";
import pesticide from "../images/garbageImages/special/pesticide.png";
import sprayCan from "../images/garbageImages/special/sprayCan.png";

export type WasteItem = {
  name: string;
  type: string;
  image: string;
};

export const bins = [
  { type: "trash",     name: "Trash",     closed: blackBinClosed,  open: blackBinOpen   },
  { type: "recycling", name: "Recycling", closed: blueBinClosed,   open: blueBinOpen    },
  { type: "compost",   name: "Compost",   closed: greenBinClosed,  open: greenBinOpen   },
  { type: "special",   name: "Hazardous", closed: hazardBinClosed, open: hazardBinOpen  },
];

export const wasteItems: WasteItem[] = [
  // Trash
  { name: "Styrofoam Plate",   type: "trash", image: styrofoam     },
  { name: "Baby Wipes",        type: "trash", image: babyWipes     },
  { name: "Brick & Textiles",  type: "trash", image: brick         },
  { name: "Clinical Mask",     type: "trash", image: clinicalMask  },
  { name: "Diaper",            type: "trash", image: diaper        },
  { name: "Fast Food Cup",     type: "trash", image: fastFoodCup   },
  { name: "Garbage Bag",       type: "trash", image: garbageBag    },
  { name: "Sponges",           type: "trash", image: sponges       },
  { name: "Toothpaste",        type: "trash", image: toothpaste    },
  { name: "Water Hose",        type: "trash", image: waterhose     },

  // Recycling
  { name: "Glass Jar",         type: "recycling", image: glassBottle      },
  { name: "Crumpled Paper",    type: "recycling", image: paper            },
  { name: "Plastic Bottle",    type: "recycling", image: plasticBottle    },
  { name: "Cardboard Box",     type: "recycling", image: cardboardBox     },
  { name: "Detergent Bottle",  type: "recycling", image: detergentBottle  },
  { name: "Egg Carton",        type: "recycling", image: eggCarton        },
  { name: "Foil Tray",         type: "recycling", image: foilTray         },
  { name: "Food Can",          type: "recycling", image: foodCan          },
  { name: "Newspaper",         type: "recycling", image: newsPaper        },
  { name: "Wine Bottle",       type: "recycling", image: wineBottle       },

  // Compost
  { name: "Apple Core",        type: "compost", image: appleCore          },
  { name: "Banana Peel",       type: "compost", image: bananaPeel         },
  { name: "Coffee Grounds",    type: "compost", image: coffeeGrounds      },
  { name: "Dead Leaves",       type: "compost", image: deadLeaves         },
  { name: "Egg Shells",        type: "compost", image: eggShells          },
  { name: "Chicken Bones",     type: "compost", image: friedChickenBones  },
  { name: "Leftover Takeout",  type: "compost", image: leftoverTakeout    },
  { name: "Moldy Cheese",      type: "compost", image: moldyCheese        },
  { name: "Old Flowers",       type: "compost", image: oldFlowers         },
  { name: "Yard Remains",      type: "compost", image: yardRemains        },

  // Hazardous (Special)
  { name: "Paint Can",         type: "special", image: paintCan      },
  { name: "Battery",           type: "special", image: battery       },
  { name: "Broken Laptop",     type: "special", image: laptop        },
  { name: "Broken Phone",      type: "special", image: phone         },
  { name: "Car Battery",       type: "special", image: carBattery    },
  { name: "Gas Cylinder",      type: "special", image: gasCylinder   },
  { name: "Lightbulb",         type: "special", image: lightbulb     },
  { name: "Motor Oil",         type: "special", image: motorOil      },
  { name: "Pesticide",         type: "special", image: pesticide     },
  { name: "Spray Can",         type: "special", image: sprayCan      },
];