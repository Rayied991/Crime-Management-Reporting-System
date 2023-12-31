PGDMP     8                    {            CMRS    15.3    15.3 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    16445    CMRS    DATABASE     �   CREATE DATABASE "CMRS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "CMRS";
                postgres    false            �            1259    25156    Admin    TABLE     �   CREATE TABLE public."Admin" (
    "AdminId" integer NOT NULL,
    "Fullname" character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    phone integer NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            �            1259    25155    Admin_AdminId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_AdminId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Admin_AdminId_seq";
       public          postgres    false    215            #           0    0    Admin_AdminId_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Admin_AdminId_seq" OWNED BY public."Admin"."AdminId";
          public          postgres    false    214            �            1259    25165    Adminprofile    TABLE     �   CREATE TABLE public."Adminprofile" (
    "profileId" integer NOT NULL,
    "Fullname" character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    phone integer NOT NULL,
    "Address" character varying NOT NULL
);
 "   DROP TABLE public."Adminprofile";
       public         heap    postgres    false            �            1259    25164    Adminprofile_profileId_seq    SEQUENCE     �   CREATE SEQUENCE public."Adminprofile_profileId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Adminprofile_profileId_seq";
       public          postgres    false    217            $           0    0    Adminprofile_profileId_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Adminprofile_profileId_seq" OWNED BY public."Adminprofile"."profileId";
          public          postgres    false    216            �            1259    25174    Manager    TABLE     �   CREATE TABLE public."Manager" (
    "ManagerID" integer NOT NULL,
    "M_Name" character varying NOT NULL,
    "M_Email" character varying NOT NULL,
    "M_Password" character varying NOT NULL
);
    DROP TABLE public."Manager";
       public         heap    postgres    false            �            1259    25173    Manager_ManagerID_seq    SEQUENCE     �   CREATE SEQUENCE public."Manager_ManagerID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Manager_ManagerID_seq";
       public          postgres    false    219            %           0    0    Manager_ManagerID_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Manager_ManagerID_seq" OWNED BY public."Manager"."ManagerID";
          public          postgres    false    218            �            1259    25191    Police    TABLE     h  CREATE TABLE public."Police" (
    "Username" character varying NOT NULL,
    "Fname" character varying NOT NULL,
    "Lname" character varying NOT NULL,
    "Location" character varying NOT NULL,
    email character varying NOT NULL,
    "phonNum" integer NOT NULL,
    "Password" character varying NOT NULL,
    "Profile_image" character varying NOT NULL
);
    DROP TABLE public."Police";
       public         heap    postgres    false            �            1259    25183    Victim    TABLE     �  CREATE TABLE public."Victim" (
    "Victimid" integer NOT NULL,
    fname character varying(150) NOT NULL,
    lname character varying(150) NOT NULL,
    "VicEmail" character varying(150) NOT NULL,
    "Vicpassword" character varying NOT NULL,
    "Confirm_Vicpassword" character varying NOT NULL,
    "NID_No" integer NOT NULL,
    "Phone" integer NOT NULL,
    "Insertfile_NID" character varying NOT NULL
);
    DROP TABLE public."Victim";
       public         heap    postgres    false            �            1259    25182    Victim_Victimid_seq    SEQUENCE     �   CREATE SEQUENCE public."Victim_Victimid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Victim_Victimid_seq";
       public          postgres    false    221            &           0    0    Victim_Victimid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Victim_Victimid_seq" OWNED BY public."Victim"."Victimid";
          public          postgres    false    220            x           2604    25159    Admin AdminId    DEFAULT     t   ALTER TABLE ONLY public."Admin" ALTER COLUMN "AdminId" SET DEFAULT nextval('public."Admin_AdminId_seq"'::regclass);
 @   ALTER TABLE public."Admin" ALTER COLUMN "AdminId" DROP DEFAULT;
       public          postgres    false    214    215    215            y           2604    25168    Adminprofile profileId    DEFAULT     �   ALTER TABLE ONLY public."Adminprofile" ALTER COLUMN "profileId" SET DEFAULT nextval('public."Adminprofile_profileId_seq"'::regclass);
 I   ALTER TABLE public."Adminprofile" ALTER COLUMN "profileId" DROP DEFAULT;
       public          postgres    false    216    217    217            z           2604    25177    Manager ManagerID    DEFAULT     |   ALTER TABLE ONLY public."Manager" ALTER COLUMN "ManagerID" SET DEFAULT nextval('public."Manager_ManagerID_seq"'::regclass);
 D   ALTER TABLE public."Manager" ALTER COLUMN "ManagerID" DROP DEFAULT;
       public          postgres    false    219    218    219            {           2604    25186    Victim Victimid    DEFAULT     x   ALTER TABLE ONLY public."Victim" ALTER COLUMN "Victimid" SET DEFAULT nextval('public."Victim_Victimid_seq"'::regclass);
 B   ALTER TABLE public."Victim" ALTER COLUMN "Victimid" DROP DEFAULT;
       public          postgres    false    220    221    221                      0    25156    Admin 
   TABLE DATA           P   COPY public."Admin" ("AdminId", "Fullname", email, phone, password) FROM stdin;
    public          postgres    false    215   *                 0    25165    Adminprofile 
   TABLE DATA           Z   COPY public."Adminprofile" ("profileId", "Fullname", email, phone, "Address") FROM stdin;
    public          postgres    false    217   ,*                 0    25174    Manager 
   TABLE DATA           S   COPY public."Manager" ("ManagerID", "M_Name", "M_Email", "M_Password") FROM stdin;
    public          postgres    false    219   I*                 0    25191    Police 
   TABLE DATA           {   COPY public."Police" ("Username", "Fname", "Lname", "Location", email, "phonNum", "Password", "Profile_image") FROM stdin;
    public          postgres    false    222   f*                 0    25183    Victim 
   TABLE DATA           �   COPY public."Victim" ("Victimid", fname, lname, "VicEmail", "Vicpassword", "Confirm_Vicpassword", "NID_No", "Phone", "Insertfile_NID") FROM stdin;
    public          postgres    false    221   �*       '           0    0    Admin_AdminId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Admin_AdminId_seq"', 1, false);
          public          postgres    false    214            (           0    0    Adminprofile_profileId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Adminprofile_profileId_seq"', 1, false);
          public          postgres    false    216            )           0    0    Manager_ManagerID_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Manager_ManagerID_seq"', 1, false);
          public          postgres    false    218            *           0    0    Victim_Victimid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Victim_Victimid_seq"', 1, false);
          public          postgres    false    220            }           2606    25163 $   Admin PK_026c0294ec43039679dc61ca701 
   CONSTRAINT     m   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "PK_026c0294ec43039679dc61ca701" PRIMARY KEY ("AdminId");
 R   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "PK_026c0294ec43039679dc61ca701";
       public            postgres    false    215            �           2606    25181 &   Manager PK_0bf36ad42daa87c5402cda3c394 
   CONSTRAINT     q   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT "PK_0bf36ad42daa87c5402cda3c394" PRIMARY KEY ("ManagerID");
 T   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT "PK_0bf36ad42daa87c5402cda3c394";
       public            postgres    false    219            �           2606    25190 %   Victim PK_41730567760c58be5e86b123cea 
   CONSTRAINT     o   ALTER TABLE ONLY public."Victim"
    ADD CONSTRAINT "PK_41730567760c58be5e86b123cea" PRIMARY KEY ("Victimid");
 S   ALTER TABLE ONLY public."Victim" DROP CONSTRAINT "PK_41730567760c58be5e86b123cea";
       public            postgres    false    221                       2606    25172 +   Adminprofile PK_8d3e348bedd895273395882ce52 
   CONSTRAINT     v   ALTER TABLE ONLY public."Adminprofile"
    ADD CONSTRAINT "PK_8d3e348bedd895273395882ce52" PRIMARY KEY ("profileId");
 Y   ALTER TABLE ONLY public."Adminprofile" DROP CONSTRAINT "PK_8d3e348bedd895273395882ce52";
       public            postgres    false    217            �           2606    25197 %   Police PK_8de5934994aa72ce47b5d37e8cb 
   CONSTRAINT     o   ALTER TABLE ONLY public."Police"
    ADD CONSTRAINT "PK_8de5934994aa72ce47b5d37e8cb" PRIMARY KEY ("Username");
 S   ALTER TABLE ONLY public."Police" DROP CONSTRAINT "PK_8de5934994aa72ce47b5d37e8cb";
       public            postgres    false    222                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     