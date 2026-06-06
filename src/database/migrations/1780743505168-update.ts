import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1780743505168 implements MigrationInterface {
    name = 'Update1780743505168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_0a4a1ce7bf2941d112ce99254ea"`);
        await queryRunner.query(`ALTER TABLE "room_type" DROP CONSTRAINT "FK_9ad71619a25ce1420d3a65b3fdc"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_a60af3e73dc64bf32778ae73906"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_55b383d0ec20230d193ca584a4a"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "courseId" integer`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "course" ADD "instructorUserId" integer`);
        await queryRunner.query(`ALTER TABLE "course" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "campusId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD "buildingId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD "campusId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD "roomTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_be84bbdf75cfb618d393a7f1194" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d2fd722dce1cb2d6f458f0fe446" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_09f754a020624e6944d5c8d9a12" FOREIGN KEY ("instructorUserId") REFERENCES "instructor"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_e08f74fe199e192525531da20ba" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_294704357112789876bfcf05468" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_88515f15db1bc3b506028f44893" FOREIGN KEY ("buildingId") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fed40e2e4f97be0ce47d5bef0b2" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_9e55182c47f8ba7a32466131837" FOREIGN KEY ("roomTypeId") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_9e55182c47f8ba7a32466131837"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fed40e2e4f97be0ce47d5bef0b2"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_88515f15db1bc3b506028f44893"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_294704357112789876bfcf05468"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_e08f74fe199e192525531da20ba"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_09f754a020624e6944d5c8d9a12"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d2fd722dce1cb2d6f458f0fe446"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_be84bbdf75cfb618d393a7f1194"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "roomTypeId"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "campusId"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "buildingId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "campusId"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "instructorUserId"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_55b383d0ec20230d193ca584a4a" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_a60af3e73dc64bf32778ae73906" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_type" ADD CONSTRAINT "FK_9ad71619a25ce1420d3a65b3fdc" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_0a4a1ce7bf2941d112ce99254ea" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
