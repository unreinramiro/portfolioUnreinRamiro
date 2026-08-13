INSERT INTO TECH_TYPES
(TCY_ID, TCY_NAME)
VALUES
(1, 'Frontend'),
(2, 'Backend'),
(3, 'Bases de Datos'),
(4, 'Herramientas');


INSERT INTO TECHNOLOGIES
(TEC_ID, TEC_TCY_ID, TEC_NAME)
VALUES
(1, 1, 'HTML5'),
(2, 1, 'CSS3'),
(3, 1, 'CSS Modules'),
(4, 1, 'JavaScript'),
(5, 1, 'Bootstrap5'),
(6, 1, 'ReactJs'),
(7, 2, '.NET Core'),
(8, 2, 'ASP.NET'),
(9, 2, 'Entity Framework'),
(10, 2, 'PHP'),
(11, 2, 'PL/SQL'),
(12, 2, 'Axios'),
(13, 3, 'SQL Server'),
(14, 3, 'MySQL'),
(15, 3, 'Oracle Databases'),
(16, 3, 'Stored Procedures'),
(17, 3, 'Triggers'),
(18, 3, 'Packages'),
(19, 4, 'Git'),
(20, 4, 'Postman'),
(21, 4, 'Control-M'),
(22, 4, 'Dynatrace'),
(23, 4, 'OpenShift'),
(24, 4, 'Swagger');

INSERT INTO STUDY_TYPE
(STY_ID, STY_NAME)
VALUES
(1, 'Universitario'),
(2, 'Curso'),
(3, 'Certificacion'),
(4, 'Bootcamp');

INSERT INTO STUDIES
(STD_ID, STD_STY_ID, STD_TITLE, STD_DESCRIPTION, STD_INTITUTION, STD_START_DATE, STD_END_DATE, STD_HOURS, STD_CERTIFICATION_URL)
VALUES
(1, 1, 'Tecnicatura Universitaria en Programacion', 'Formación integral en desarrollo de software, bases de datos, redes y arquitectura de sistemas.', 'Universidad Tecnológica Nacional (UTN)', '2026/03/09', null, null, null),
(2, 2, 'Desarrollo web con PHP y MySQL', null, 'Educación IT', '2023/07/10', '2023/10/02', 40, null),
(3, 2, 'ReactJs', null, 'Educación IT', '2023/12/05', '2024/01/16', 40, null),
(4, 2, 'Introduccion a Bases de Datos y SQL', null, 'Educación IT', '2023/02/13', '2023/03/20', 40, null),
(5, 2, 'Fundamentos de Bases de Datos - Avanzado', null, 'Universidad Tecnológica Nacional (UTN)', '2023/04/05', '2023/05/03', 40, null),
(6, 2, 'Programación en Base de Datos Oracle - Lenguaje PL-SQL', null, 'Universidad Tecnológica Nacional (UTN)', '2023/05/24', '2023/06/21', 40, null);

INSERT INTO PROFILE
(PRO_ID, PRO_NAME, PRO_SURNAME, PRO_DESC, PRO_IMG)
VALUES
(1, 'Ramiro', 'Unrein', 'Soy un desarrollador fullstack de Argentina, mi enfoque se basa en soluciones reales con APIs robustas. Las mismas las llevo a cabo con .NET Core y React. Cuento con experiencia practica desarrollando aplicaciones web tales como ecommerces, sistemas de gestión de inventarios, entre otros. Mi perfil esta complementado con el manejo de bases de datos relacionales, herramientas esenciales como Git y OpenShift. Actualmente me encuentro cursando la carrera de Tecnicatura Universitaria en Programacion en la UTN.', 'fotoCv.jpg')

INSERT INTO ASSIGNATURES
(ASG_ID,  ASG_STD_ID, ASG_TITLE, ASG_STATUS, ASG_FIRST_NOTE, ASG_SECOND_NOTE, ASG_SEMESTER, ASG_PROMOTION, ASG_YEAR)
VALUES
(1, 1, 'Programacion I', 'Finalizada', 9.20, 9.70, 1, 1, 1),
(2, 1, 'Arq de S.O', 'Finalizada', 9.60, 10.00, 1, 1, 1),
(3, 1, 'Matematica', 'Finalizada', 9.33, 9.00, 1, 1, 1),
(4, 1, 'Org. Empresarial', 'Finalizada', 9.50, 8.80, 1, 1, 1);

INSERT INTO PROJECTS
(PRO_ID, PRO_TITLE, PRO_IMG_1, PRO_IMG_2, PRO_IMG_3, PRO_IMG_4, PRO_DESCRIPTION, PRO_GITHUB_URL, PRO_PRODUCTION_URL)
VALUES
(4, 'Aritz Cosmetica Natural - Ecommerce', 'aritzProyect.png', null, null, null, 'Este es un proyecto de desarrollo web utilizando React y .NET con bases de datos en SQL Server. El proyecto consiste en la creación de una aplicación web que permite a los usuarios registrarse, iniciar sesión y gestionar su perfil. La aplicación también incluye funcionalidades para publicar contenido, interactuar con otros usuarios y administrar la base de datos.', 'https://github.com/unreinramiro/aritzCosmetica', 'https://www.aritz.com.ar/');

INSERT INTO PROJECT_TECHNOLOGIES
(PRT_ID, PRT_PRO_ID, PRT_TEC_ID)
VALUES
(1, 1, 1), (2, 1, 2), (3, 1, 3), (4, 1, 6), (5, 1, 5), (6, 1, 7), (7, 1, 8), (8, 1, 9), (9, 1, 19);

SELECT *
FROM PROJECT_TECHNOLOGIES

SELECT *
FROM TECHNOLOGIES;

SELECT *
FROM PROJECTS;

SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'STUDIES' 
ORDER BY ORDINAL_POSITION;