using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlantillaFullstack.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialSqlite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ASSIGNATURES",
                columns: table => new
                {
                    ASG_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ASG_STD_ID = table.Column<int>(type: "INTEGER", nullable: false),
                    ASG_TITLE = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    ASG_FIRST_NOTE = table.Column<double>(type: "REAL", nullable: true),
                    ASG_SECOND_NOTE = table.Column<double>(type: "REAL", nullable: true),
                    ASG_PROMOTION = table.Column<bool>(type: "INTEGER", nullable: true),
                    ASG_SEMESTER = table.Column<int>(type: "INTEGER", nullable: false),
                    ASG_STATUS = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    ASG_YEAR = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ASSIGNATURES", x => x.ASG_ID);
                });

            migrationBuilder.CreateTable(
                name: "PROFILE",
                columns: table => new
                {
                    PRO_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PRO_NAME = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    PRO_SURNAME = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    PRO_DESC = table.Column<string>(type: "TEXT", maxLength: 700, nullable: false),
                    PRO_IMG = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROFILE", x => x.PRO_ID);
                });

            migrationBuilder.CreateTable(
                name: "PROJECTS",
                columns: table => new
                {
                    PRO_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PRO_TITLE = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    PRO_IMG_1 = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    PRO_IMG_2 = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    PRO_IMG_3 = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    PRO_IMG_4 = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    PRO_DESCRIPTION = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    PRO_GITHUB_URL = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    PRO_PRODUCTION_URL = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROJECTS", x => x.PRO_ID);
                });

            migrationBuilder.CreateTable(
                name: "STUDIES",
                columns: table => new
                {
                    STD_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    STD_STY_ID = table.Column<int>(type: "INTEGER", nullable: false),
                    STD_TITLE = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    STD_DESCRIPTION = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    STD_INSTITUTION = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    STD_START_DATE = table.Column<DateTime>(type: "TEXT", nullable: true),
                    STD_END_DATE = table.Column<DateTime>(type: "TEXT", nullable: true),
                    STD_HOURS = table.Column<int>(type: "INTEGER", nullable: true),
                    STD_CERTIFICATION_URL = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_STUDIES", x => x.STD_ID);
                });

            migrationBuilder.CreateTable(
                name: "STUDY_TYPE",
                columns: table => new
                {
                    STY_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    STY_NAME = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_STUDY_TYPE", x => x.STY_ID);
                });

            migrationBuilder.CreateTable(
                name: "TECH_TYPES",
                columns: table => new
                {
                    TCY_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TCY_NAME = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TECH_TYPES", x => x.TCY_ID);
                });

            migrationBuilder.CreateTable(
                name: "TECHNOLOGIES",
                columns: table => new
                {
                    TEC_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TEC_TCY_ID = table.Column<int>(type: "INTEGER", nullable: false),
                    TEC_NAME = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TECHNOLOGIES", x => x.TEC_ID);
                });

            migrationBuilder.CreateTable(
                name: "PROJECT_TECHNOLOGIES",
                columns: table => new
                {
                    PRT_ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PRT_PRO_ID = table.Column<int>(type: "INTEGER", nullable: false),
                    PRT_TEC_ID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROJECT_TECHNOLOGIES", x => x.PRT_ID);
                    table.ForeignKey(
                        name: "FK_PROJECT_TECHNOLOGIES_PROJECTS_PRT_PRO_ID",
                        column: x => x.PRT_PRO_ID,
                        principalTable: "PROJECTS",
                        principalColumn: "PRO_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PROJECT_TECHNOLOGIES_TECHNOLOGIES_PRT_TEC_ID",
                        column: x => x.PRT_TEC_ID,
                        principalTable: "TECHNOLOGIES",
                        principalColumn: "TEC_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PROJECT_TECHNOLOGIES_PRT_PRO_ID",
                table: "PROJECT_TECHNOLOGIES",
                column: "PRT_PRO_ID");

            migrationBuilder.CreateIndex(
                name: "IX_PROJECT_TECHNOLOGIES_PRT_TEC_ID",
                table: "PROJECT_TECHNOLOGIES",
                column: "PRT_TEC_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ASSIGNATURES");

            migrationBuilder.DropTable(
                name: "PROFILE");

            migrationBuilder.DropTable(
                name: "PROJECT_TECHNOLOGIES");

            migrationBuilder.DropTable(
                name: "STUDIES");

            migrationBuilder.DropTable(
                name: "STUDY_TYPE");

            migrationBuilder.DropTable(
                name: "TECH_TYPES");

            migrationBuilder.DropTable(
                name: "PROJECTS");

            migrationBuilder.DropTable(
                name: "TECHNOLOGIES");
        }
    }
}
