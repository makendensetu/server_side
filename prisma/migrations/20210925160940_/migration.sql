/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lon" REAL NOT NULL,
    "lat" REAL NOT NULL,
    "imagePath" TEXT NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "id", "imagePath", "lat", "lon", "updatedAt") SELECT "createdAt", "id", "imagePath", "lat", "lon", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
