import React, { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
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
import { uploadCompanyDocumentsReq } from "../../../services/api";
import { ICompanyDocumentsPostData } from "../../../services/api/constants";
import { useParams } from "react-router";
import { BUYER_DOC_TYPES } from "../BuyerDashboard.constants";

interface IProps {
  setErrorMessage: (message: string) => void;
  getCompanyInfo: () => void;
  companyDocuments: any;
  setCompanyDocuments: any;
}

const UploadDocuments = ({
  setErrorMessage,
  getCompanyInfo,
  companyDocuments,
}: IProps) => {
  const state: any = useSelector((state) => state);
  const { accessToken } = state.auth;
  const [isUploading, setIsUploading] = useState<{
    registrationCertificateUrl: boolean;
    businessCardUrl: boolean;
    portfolioUrl: boolean;
  }>({
    registrationCertificateUrl: false,
    businessCardUrl: false,
    portfolioUrl: false,
  });

  const [imageError, setImageError] = useState<{
    registrationCertificateUrl: string | null;
    businessCardUrl: string | null;
    portfolioUrl: string | null;
  }>({
    registrationCertificateUrl: null,
    businessCardUrl: null,
    portfolioUrl: null,
  });
  const config: any = {
    bucketName: s3_bucket_name,
    dirName: s3_dir_name_documents,
    region: s3_region,
    accessKeyId: s3_access_key,
    secretAccessKey: s3_secret_key,
  };
  let { userId, companyId } = useParams<{
    userId?: string | undefined;
    companyId?: string | undefined;
  }>();

  const s3 = new ReactS3Client(config);

  const onUploadLoading = (field: string, value: boolean) => {
    setIsUploading((currentState: any) => {
      return {
        ...currentState,
        [field]: value,
      };
    });
  };

  const uploadDocuments = async (
    body: ICompanyDocumentsPostData,
    docType: string
  ) => {
    onUploadLoading(docType, true);
    try {
      await uploadCompanyDocumentsReq({
        userId,
        companyId,
        accessToken,
        docType,
        body,
      });
      getCompanyInfo();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    onUploadLoading(docType, false);
  };

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
    <div>
      <Row className="mt-4">
        <Col lg={4} md={12} sm={12}>
          <h2>Documents</h2>
        </Col>
        <Col lg={8} md={12} sm={12}>
          <Row>
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
            </Col>
            <Col lg={12} md={12} sm={12}>
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
            </Col>
            <Col lg={12} md={12} sm={12}>
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
        </Col>
      </Row>
    </div>
  );
};

export default UploadDocuments;
