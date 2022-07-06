USE [db_conciliations]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[conciliations]') AND type in (N'U'))
DROP TABLE [dbo].[conciliations]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[conciliation_credits_totals]') AND type in (N'U'))
DROP TABLE [dbo].[conciliation_credits_totals]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[conciliation_credits]') AND type in (N'U'))
DROP TABLE [dbo].[conciliation_credits]
GO
USE [master]
GO
DROP DATABASE [db_conciliations]
GO
CREATE DATABASE [db_conciliations]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_conciliations', FILENAME = N'/var/opt/mssql/data/db_conciliations.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_conciliations_log', FILENAME = N'/var/opt/mssql/data/db_conciliations_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [db_conciliations] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_conciliations].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_conciliations] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_conciliations] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_conciliations] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_conciliations] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_conciliations] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_conciliations] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_conciliations] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_conciliations] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_conciliations] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_conciliations] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_conciliations] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_conciliations] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_conciliations] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_conciliations] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_conciliations] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_conciliations] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_conciliations] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_conciliations] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_conciliations] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_conciliations] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_conciliations] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_conciliations] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_conciliations] SET RECOVERY FULL 
GO
ALTER DATABASE [db_conciliations] SET  MULTI_USER 
GO
ALTER DATABASE [db_conciliations] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_conciliations] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_conciliations] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_conciliations] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_conciliations] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_conciliations] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [db_conciliations] SET QUERY_STORE = OFF
GO
USE [db_conciliations]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[conciliation_credits](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[credit] [decimal](18, 2) NOT NULL,
	[month] [smallint] NOT NULL,
	[added_by] [nvarchar](50) NULL,
	[added_in] [date] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[conciliation_credits] SET (LOCK_ESCALATION = AUTO)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[conciliation_credits_totals](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[amount] [decimal](18, 2) NOT NULL,
	[month] [smallint] NOT NULL,
	[remaining] [decimal](18, 2) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[conciliation_credits_totals] SET (LOCK_ESCALATION = AUTO)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[conciliations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[date] [date] NULL,
	[credit] [decimal](18, 2) NULL,
	[debit_bnp] [decimal](18, 2) NOT NULL,
	[debit_mides] [decimal](18, 2) NULL,
	[balance] [decimal](18, 2) NULL,
	[description] [nvarchar](50) NULL,
	[reference] [nvarchar](50) NULL,
	[timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_conciliations] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[conciliations] SET (LOCK_ESCALATION = AUTO)
GO
SET IDENTITY_INSERT [dbo].[conciliation_credits] ON 
GO
INSERT [dbo].[conciliation_credits] ([id], [credit], [month], [added_by], [added_in]) VALUES (32, CAST(150000.00 AS Decimal(18, 2)), 7, N'', CAST(N'2022-07-06' AS Date))
GO
SET IDENTITY_INSERT [dbo].[conciliation_credits] OFF
GO
SET IDENTITY_INSERT [dbo].[conciliation_credits_totals] ON 
GO
INSERT [dbo].[conciliation_credits_totals] ([id], [amount], [month], [remaining]) VALUES (6, CAST(150000.00 AS Decimal(18, 2)), 7, CAST(108764.78 AS Decimal(18, 2)))
GO
SET IDENTITY_INSERT [dbo].[conciliation_credits_totals] OFF
GO
SET IDENTITY_INSERT [dbo].[conciliations] ON 
GO
INSERT [dbo].[conciliations] ([id], [date], [credit], [debit_bnp], [debit_mides], [balance], [description], [reference]) VALUES (30, CAST(N'2022-07-06' AS Date), CAST(150000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(25000.00 AS Decimal(18, 2)), CAST(125000.00 AS Decimal(18, 2)), N'asd', N'sfdsdf')
GO
INSERT [dbo].[conciliations] ([id], [date], [credit], [debit_bnp], [debit_mides], [balance], [description], [reference]) VALUES (31, CAST(N'2022-07-06' AS Date), CAST(125000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(15000.00 AS Decimal(18, 2)), CAST(110000.00 AS Decimal(18, 2)), N'sdfsdf', N'sfdsdf')
GO
INSERT [dbo].[conciliations] ([id], [date], [credit], [debit_bnp], [debit_mides], [balance], [description], [reference]) VALUES (32, CAST(N'2022-07-06' AS Date), CAST(110000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(1235.22 AS Decimal(18, 2)), CAST(108764.78 AS Decimal(18, 2)), N'test', N'prueba')
GO
SET IDENTITY_INSERT [dbo].[conciliations] OFF
GO
USE [master]
GO
ALTER DATABASE [db_conciliations] SET  READ_WRITE 
GO
