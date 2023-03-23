import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IMAGE_FORMATS } from "../../ProductListings/ProductListings.constants";
import ReactS3Client from "react-aws-s3-typescript";
import ImageInput from "../../../components/ImageInput";
import {
  s3_bucket_name,
  s3_access_key,
  s3_dir_name_documents,
  s3_region,
  s3_secret_key,
} from "../../../config";
import { useParams } from "react-router";
import { ICompanyDocumentsPostData } from "../../../services/api/constants";
import { adminUploadCompanyDocumentsReq } from "../../../services/api";
import { BUYER_DOC_TYPES } from "../../BuyerDashboard/BuyerDashboard.constants";

interface IProps {
  setModalVisible: (state: boolean) => void;
  getAllCompanyProductListings: () => void;
  companyDocuments: any;
}

const UploadDocuments = ({
  setModalVisible,
  getAllCompanyProductListings,
  companyDocuments,
}: IProps) => {
  const state: any = useSelector((state) => state);
  const { userId, accessToken } = state.auth;
  const adminId = userId;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<{
    regCertificate: string | null;
    companyPortFolio: string | null;
    businessCard: string | null;
  }>({
    regCertificate: null,
    companyPortFolio: null,
    businessCard: null,
  });
  const [isUploading, setIsUploading] = useState<{
    registrationCertificateUrl: boolean;
    businessCardUrl: boolean;
    portfolioUrl: boolean;
  }>({
    registrationCertificateUrl: false,
    businessCardUrl: false,
    portfolioUrl: false,
  });

  const config: any = {
    bucketName: s3_bucket_name,
    dirName: s3_dir_name_documents,
    region: s3_region,
    accessKeyId: s3_access_key,
    secretAccessKey: s3_secret_key,
  };
  let { companyId } = useParams<{
    userId?: string | undefined;
    companyId?: string | undefined;
  }>();

  const onUploadLoading = (field: string, value: boolean) => {
    setIsUploading((currentState: any) => {
      return {
        ...currentState,
        [field]: value,
      };
    });
  };

  const s3 = new ReactS3Client(config);

  const uploadImagestoS3 = async (file: File, name: string) => {
    let body: ICompanyDocumentsPostData = {
      registrationCertificateUrl: null,
      businessCardUrl: null,
      portfolioUrl: null,
    };
    onUploadLoading(name, true);
    try {
      const imgRes = await s3.uploadFile(file);
      body = { ...body, [name]: imgRes.location };
      uploadDocuments(body, name);
    } catch (err: any) {
      setErrorMessage(err);
    }
    onUploadLoading(name, false);
  };

  const uploadDocuments = async (
    body: ICompanyDocumentsPostData,
    docType: string
  ) => {
    onUploadLoading(docType, true);
    try {
      await adminUploadCompanyDocumentsReq({
        adminId,
        companyId,
        accessToken,
        docType,
        body,
      });
      getAllCompanyProductListings();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    onUploadLoading(docType, false);
  };

  const handleUpload: any = async (fileList: any, name: string) => {
    if (fileList) {
      const isFormat: boolean = IMAGE_FORMATS.includes(
        fileList.target.files[0]?.type
      );
      setImageError((currentState) => {
        return {
          ...currentState,
          [fileList.target.name]: isFormat
            ? null
            : "Image should be jpeg, png, jpg or pdf",
        };
      });
      if (isFormat) {
        await uploadImagestoS3(fileList.target.files[0], name);
        fileList.target.value = "";
      }
    }
  };

  const onRemoveImage = (name: string) => {
    uploadDocuments(
      {
        registrationCertificateUrl: null,
        businessCardUrl: null,
        portfolioUrl: null,
      },
      name
    );
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col lg={12} md={12} sm={12}>
        <ImageInput
          fieldName={BUYER_DOC_TYPES.registrationCertificateUrl}
          companyDocuments={companyDocuments}
          label={"Registration Certificate"}
          imageError={imageError}
          onChange={handleUpload}
          required={true}
          onRemoveImage={onRemoveImage}
          isUploading={isUploading}
        />
        <ImageInput
          fieldName={BUYER_DOC_TYPES.portfolioUrl}
          companyDocuments={companyDocuments}
          label={"Company Portfolio"}
          imageError={imageError}
          onChange={handleUpload}
          required={false}
          onRemoveImage={onRemoveImage}
          isUploading={isUploading}
        />

        <ImageInput
          fieldName={BUYER_DOC_TYPES.businessCardUrl}
          companyDocuments={companyDocuments}
          label={"Director's/Manager's Business Card"}
          imageError={imageError}
          onChange={handleUpload}
          required={false}
          onRemoveImage={onRemoveImage}
          isUploading={isUploading}
        />
      </Col>
    </Row>
  );
};

export default UploadDocuments;
