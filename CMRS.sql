PGDMP     $    '        	        {            CMRS    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16445    CMRS    DATABASE     �   CREATE DATABASE "CMRS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "CMRS";
                postgres    false            �            1259    16447    Admin    TABLE     �   CREATE TABLE public."Admin" (
    id integer NOT NULL,
    "Fullname" character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    "Location" character varying NOT NULL
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            �            1259    16446    Admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Admin_id_seq";
       public          postgres    false    215            	           0    0    Admin_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;
          public          postgres    false    214            �            1259    16484 	   victimReg    TABLE     �  CREATE TABLE public."victimReg" (
    id integer NOT NULL,
    fname character varying(150) NOT NULL,
    lname character varying(150) NOT NULL,
    "VicEmail" character varying(150) NOT NULL,
    "Vicpassword" character varying NOT NULL,
    "Confirm_Vicpassword" character varying NOT NULL,
    "NID_No" integer NOT NULL,
    "Phone" integer NOT NULL,
    "Insertfile_NID" character varying NOT NULL,
    "adminId" integer
);
    DROP TABLE public."victimReg";
       public         heap    postgres    false            �            1259    16483    victimReg_id_seq    SEQUENCE     �   CREATE SEQUENCE public."victimReg_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."victimReg_id_seq";
       public          postgres    false    217            
           0    0    victimReg_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."victimReg_id_seq" OWNED BY public."victimReg".id;
          public          postgres    false    216            j           2604    16450    Admin id    DEFAULT     h   ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);
 9   ALTER TABLE public."Admin" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            k           2604    16487    victimReg id    DEFAULT     p   ALTER TABLE ONLY public."victimReg" ALTER COLUMN id SET DEFAULT nextval('public."victimReg_id_seq"'::regclass);
 =   ALTER TABLE public."victimReg" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217                       0    16447    Admin 
   TABLE DATA           D   COPY public."Admin" (id, "Fullname", email, "Location") FROM stdin;
    public          postgres    false    215   �                 0    16484 	   victimReg 
   TABLE DATA           �   COPY public."victimReg" (id, fname, lname, "VicEmail", "Vicpassword", "Confirm_Vicpassword", "NID_No", "Phone", "Insertfile_NID", "adminId") FROM stdin;
    public          postgres    false    217   �                  0    0    Admin_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Admin_id_seq"', 2, true);
          public          postgres    false    214                       0    0    victimReg_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."victimReg_id_seq"', 12, true);
          public          postgres    false    216            m           2606    16454 $   Admin PK_3a489f4a44372ff150d7924dc3d 
   CONSTRAINT     f   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d";
       public            postgres    false    215            o           2606    16491 (   victimReg PK_afc724d0a543ce4abc27578abdb 
   CONSTRAINT     j   ALTER TABLE ONLY public."victimReg"
    ADD CONSTRAINT "PK_afc724d0a543ce4abc27578abdb" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."victimReg" DROP CONSTRAINT "PK_afc724d0a543ce4abc27578abdb";
       public            postgres    false    217            p           2606    16492 (   victimReg FK_0fd8b790feb07fcc36983318e98    FK CONSTRAINT     �   ALTER TABLE ONLY public."victimReg"
    ADD CONSTRAINT "FK_0fd8b790feb07fcc36983318e98" FOREIGN KEY ("adminId") REFERENCES public."Admin"(id);
 V   ALTER TABLE ONLY public."victimReg" DROP CONSTRAINT "FK_0fd8b790feb07fcc36983318e98";
       public          postgres    false    3181    215    217                )   x�3�J��LM�,S鹉�9z����.�ى\1z\\\ �jl         h   x�3�����K42�N,�N,2�,�8��&f��%��r�!mlbjff BN?}G�?.c*�gh 7��ؘB3=����ӋR���f��l#�m����� ��q�     