USE [master]
GO
/****** Object:  Database [DBPracticaRN]    Script Date: 11/8/2023 12:00:07 ******/
CREATE DATABASE [DBPracticaRN]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBPracticaRN', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DBPracticaRN.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DBPracticaRN_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DBPracticaRN_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DBPracticaRN] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBPracticaRN].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBPracticaRN] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBPracticaRN] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBPracticaRN] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBPracticaRN] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBPracticaRN] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBPracticaRN] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DBPracticaRN] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBPracticaRN] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBPracticaRN] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBPracticaRN] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBPracticaRN] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBPracticaRN] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBPracticaRN] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBPracticaRN] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBPracticaRN] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DBPracticaRN] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBPracticaRN] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBPracticaRN] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBPracticaRN] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBPracticaRN] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBPracticaRN] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBPracticaRN] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBPracticaRN] SET RECOVERY FULL 
GO
ALTER DATABASE [DBPracticaRN] SET  MULTI_USER 
GO
ALTER DATABASE [DBPracticaRN] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBPracticaRN] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBPracticaRN] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBPracticaRN] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DBPracticaRN] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DBPracticaRN', N'ON'
GO
ALTER DATABASE [DBPracticaRN] SET QUERY_STORE = OFF
GO
USE [DBPracticaRN]
GO
/****** Object:  User [alumno]    Script Date: 11/8/2023 12:00:07 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Admin]    Script Date: 11/8/2023 12:00:07 ******/
CREATE USER [Admin] FOR LOGIN [Admin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Adm]    Script Date: 11/8/2023 12:00:07 ******/
CREATE USER [Adm] FOR LOGIN [Adm] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Admin]
GO
ALTER ROLE [db_owner] ADD MEMBER [Adm]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 11/8/2023 12:00:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](4000) NOT NULL,
	[Contrasenia] [varchar](4000) NOT NULL,
	[Telefono] [varchar](4000) NOT NULL,
	[Mail] [varchar](4000) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Nombre], [Contrasenia], [Telefono], [Mail]) VALUES (1, N'Derixas', N'Casasola', N'+5491156988295', N'galojojojoxd123@hotmail.com')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
USE [master]
GO
ALTER DATABASE [DBPracticaRN] SET  READ_WRITE 
GO
