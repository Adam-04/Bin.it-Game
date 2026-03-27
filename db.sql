-- ! CREATE TABLES ! --
-- Enable UUID generation in PostgreSQL using gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table, gives them a unique id
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create lesson tables, stores the lesssons about how to sort trash
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    lesson_order INT NOT NULL UNIQUE,
);

-- Create game_sessions table, stores leaderboard scores
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    score INT NOT NULL DEFAULT 0,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,

    -- Foreign key ensures the game sessions are matched to a specific user
    CONSTRAINT fk_game_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Create progress table, stores the progress made on the lessons table
CREATE TABLE progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lesson_id UUID NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completion_date TIMESTAMP,

    -- Foreign keys ensure progress is matched to a unique user and lesson
    CONSTRAINT fk_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_progress_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_lesson
        UNIQUE (user_id, lesson_id)
);

-- Create table to save garbage image paths as strings
CREATE TABLE GARBAGE_IMAGES (
    garbageType VARCHAR(50),
    path VARCHAR(255),
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() 
);

-- ! STATIC INSERTS ! --
-- Static inserts to Garbage
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/appleCore.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/bananaPeel.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/coffeeGrounds.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/deadLeaves.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/eggshells.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/friedChickenBones.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/leftoverTakeout.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/moldyCheese.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/oldFlowers.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('compost', 'images/garbageImages/compost/yardRemains.png');

INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/cardboardBox.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/crumpledPaper.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/detergentBottle.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/eggCartoon.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/foilTray.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/foodCan.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/glassJar.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/newspaper.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/plasticBottle.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('recycling', 'images/garbageImages/recycling/wineBottle.png');

INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/batteries.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/brokenLaptop.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/brokenPhone.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/carBattery.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/gasCylinder.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/lightbulb.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/motorOil.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/paintBucket.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/pesticide.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('special', 'images/garbageImages/special/sprayCan.png');

INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/babyWipes.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/brickAndTextiles.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/clinicalMask.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/diaper.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/disposableFastfoodCup.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/garbageBag.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/sponges.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/styrofoamPlate.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/toothpaste.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trash', 'images/garbageImages/trash/waterHose.png');

INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/blackBinClosed.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/blackBinOpen.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/blueBinClosed.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/blueBinOpen.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/greenBinClosed.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/greenBinOpen.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/specialBinClosed.png');
INSERT INTO GARBAGE_IMAGES (garbageType, path) VALUES ('trashCans', 'images/garbageImages/trashCans/specialBinOpen.png');

INSERT INTO Lessons (title, content, lesson_order) VALUES
(
    'Compost',
    $$Compost is made up of organic materials that come from plants or animals and can break down naturally over time. When food scraps, yard waste, and other compostable materials are thrown into the garbage instead of a compost bin, they usually end up in a landfill. In a landfill, these materials often do not break down properly because they are packed tightly and do not get enough oxygen. This can lead to the production of methane, a greenhouse gas that contributes to climate change. Composting is important because it allows these materials to decompose in a controlled way and become nutrient-rich material that can improve soil.

Common compost items include fruit and vegetable scraps, coffee grounds, tea bags, eggshells, yard trimmings, dead flowers, and certain food-soiled paper products if accepted by the local program. Some compost systems also accept items like bones, meat scraps, and takeout leftovers, while others do not, so it is always important to follow local rules. The key idea is that compost accepts things that were once living and can return safely to the earth through decomposition.

One of the biggest mistakes people make is assuming that anything natural can go in compost. That is not always true. For example, a large piece of wood, pet waste, plastic labeled as biodegradable, or compostable packaging may not belong in a home or municipal compost program unless the program specifically allows it. Another mistake is putting compostable food in plastic bags. Even if the food is correct, the plastic bag can contaminate the compost stream and make processing more difficult. Contamination reduces the quality of the finished compost and may cause entire batches to be rejected.

Composting has many benefits. It reduces the amount of waste sent to landfill, lowers greenhouse gas emissions, and creates a useful end product for gardens, farms, and landscaping. Compost helps soil retain moisture, improves structure, and returns nutrients to the ground. This supports healthier plant growth and can reduce the need for chemical fertilizers.

A good habit is to think about whether an item is organic and whether it can break down safely in the compost system available to you. If the answer is yes, it may belong in compost. If you are unsure, check the rules for your area instead of guessing. Sorting compost correctly is an easy way to make a positive environmental impact every day. By separating food scraps and yard materials from general trash, people help turn waste into a resource and support a cleaner, more sustainable community.$$,
    (SELECT COALESCE(MAX(lesson_order), 0) + 1 FROM lessons)
),
(
    'Recycling',
    $$Recycling is the process of collecting used materials, processing them, and turning them into new products. It helps reduce the need for raw materials, saves energy, and lowers the amount of waste sent to landfills. Recycling works best when people sort items correctly and keep recyclable materials as clean as possible. The goal is to keep valuable materials like paper, cardboard, metal, glass, and certain plastics in use for as long as possible instead of treating them as garbage after one use.

Many common household items can be recycled. Examples include cardboard boxes, newspapers, paper packaging, glass jars, metal food cans, aluminum trays, and some plastic bottles and containers. These items are made from materials that can often be reprocessed into new packaging, containers, or other products. However, not every item that looks recyclable actually belongs in the recycling bin. That is why learning the difference between recyclable materials and contaminants is so important.

One of the most important recycling rules is to make sure items are empty, clean, and dry before putting them in the bin. A small amount of residue may be acceptable, but heavily soiled items can contaminate paper and other recyclables. For example, a clean detergent bottle may be recyclable, but a paper item soaked with grease or food may not be. If recyclables are too contaminated, they may be sent to landfill instead of being processed. This wastes the effort of sorting and can increase processing costs.

Another common issue is wish-cycling. Wish-cycling happens when people put an item in the recycling bin because they hope it can be recycled, even though they are not sure. Examples might include plastic toys, hoses, electronics, or mixed-material packaging. These items can jam sorting machinery, slow down processing, and contaminate large batches of recyclables. When in doubt, it is better to check local guidelines than to guess.

Recycling is not a perfect solution, but it plays an important role in waste reduction. Making new products from recycled aluminum, paper, and glass often uses less energy than producing them from raw materials. Recycling also helps conserve natural resources such as trees, metal ores, and sand. Still, recycling should be combined with reducing and reusing. The best waste is waste that is never created in the first place.

To recycle well, focus on the material, not just the shape of the item. Ask whether it is a clean paper, metal, glass, or accepted plastic container. Check local rules because recycling systems vary by region. By sorting carefully and keeping recyclable items clean, people make recycling more effective and help build a more efficient and environmentally responsible waste system.$$,
    (SELECT COALESCE(MAX(lesson_order), 0) + 2 FROM lessons)
),
(
    'Trash',
    $$Trash includes items that cannot be safely composted, cannot be recycled through the local recycling system, and do not belong in special disposal programs. It is the category for waste that has reached the end of its useful life and has no regular recovery path through home sorting systems. While trash is a necessary category, it should usually be the last option after considering whether something can be reduced, reused, repaired, composted, or recycled.

Common trash items often include things like diapers, baby wipes, sponges, toothpaste tubes, heavily contaminated packaging, broken mixed-material household items, and certain disposable products. These objects are usually difficult to process because they are made from several materials fused together, are too dirty to recover, or were never designed for recycling or composting in the first place. For example, a disposable fast-food cup may look like paper, but it may contain a plastic lining that makes it unsuitable for normal paper recycling. A clinical mask may contain layered synthetic materials that also cannot be processed in household recycling.

A major challenge with trash is that people sometimes put trash into recycling or compost bins because they want to avoid throwing it away. This causes contamination. A trash item in the wrong bin can damage equipment, lower the quality of recyclable or compostable materials, and increase sorting costs. In some cases, one incorrect item can spoil a much larger group of properly sorted materials. That is why understanding what belongs in trash is just as important as understanding what belongs in recycling or compost.

Landfills are the most common destination for trash. In a landfill, waste is buried and managed to reduce immediate harm, but it still takes up space and can remain there for a very long time. Some trash items break down slowly, while others may not break down much at all. This is one reason waste reduction matters. Choosing reusable products, repairing damaged items, and buying less disposable packaging can reduce the amount of trash a household creates.

When deciding whether something belongs in the trash, ask a few simple questions. Is it contaminated with food, chemicals, or bodily fluids? Is it made of several materials that cannot be separated easily? Is it not accepted in local recycling or compost programs? If the answer is yes, it is likely trash unless it belongs in a special disposal category. Special waste must not be confused with regular trash.

The trash bin is important because it provides a safe place for non-recoverable everyday waste, but it should not become the default for everything. Better sorting helps recover more materials and protects the environment. By learning what truly belongs in the trash, people can avoid contamination, improve waste management, and make more responsible choices about the products they use every day.$$,
    (SELECT COALESCE(MAX(lesson_order), 0) + 3 FROM lessons)
),
(
    'Special',
    $$Special waste includes items that should not be thrown in the regular trash, recycling, or compost at home because they may be hazardous, contain valuable recoverable materials, or require special handling. These items can pose risks to human health, sanitation workers, waste processing staff, and the environment if they are disposed of incorrectly. Special waste often includes batteries, electronics, paint, pesticides, gas cylinders, fluorescent bulbs, motor oil, and similar materials.

One reason special items need separate disposal is that many of them contain chemicals, metals, or pressurized contents. Batteries can leak corrosive substances or even cause fires if damaged or crushed. Electronics such as broken phones and laptops may contain heavy metals and other components that should be recovered or handled safely. Paint, pesticides, and motor oil can pollute soil and water if dumped into the garbage, drains, or the environment. Aerosol cans and gas cylinders may be pressurized, which means they can be dangerous if punctured or exposed to heat.

Special waste is often collected through depots, return programs, hazardous waste drop-off events, or designated recycling centers. These systems are designed to manage items safely and recover useful materials when possible. For example, electronics recycling can recover metals and components. Used oil programs can process oil properly instead of allowing it to contaminate water systems. Battery collection programs help prevent fires and reduce toxic contamination. Because these systems vary by location, it is important to check local instructions before disposal.

A common mistake is putting special waste into the trash because it seems easier. This can create serious problems. A lithium battery in the garbage or recycling can spark and start a fire in a truck or processing facility. A paint can may leak. A pesticide container may expose workers to hazardous residue. Even a single incorrectly disposed item can create risks far beyond one household. That is why special waste must be treated differently.

Another important point is that not all special items are obviously dangerous. A lightbulb, a small battery, or an old electronic cable may seem harmless, but many such items still require proper disposal. The safest habit is to ask whether an item contains chemicals, electronics, oil, metal components, or pressurized contents. If it does, it may belong in a special waste program rather than a regular bin.

Handling special waste responsibly protects people and the environment. It reduces fire risk, prevents toxic pollution, and supports recovery of useful materials. It also keeps harmful substances out of landfills and compost systems. Good waste sorting means recognizing that some items need extra care. By taking batteries, electronics, paint, bulbs, and chemicals to approved drop-off locations instead of throwing them away at home, people help create a safer and more sustainable waste system for everyone.$$,
    (SELECT COALESCE(MAX(lesson_order), 0) + 4 FROM lessons)
);