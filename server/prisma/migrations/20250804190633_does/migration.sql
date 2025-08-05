-- CreateTable
CREATE TABLE "UserInfo" (
    "user_id" INTEGER NOT NULL,
    "Profession" TEXT NOT NULL,
    "Employer" TEXT NOT NULL,
    "Skills" TEXT[],
    "Location" TEXT NOT NULL,
    "AboutMe" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
