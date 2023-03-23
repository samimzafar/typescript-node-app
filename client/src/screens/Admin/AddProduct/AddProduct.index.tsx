import * as React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout.index";
import APCard from "../../../components/APCard";
import APButton from "../../../components/APButton";
import { Col, Row, Spinner, Form, FloatingLabel } from "react-bootstrap";
import {
  getProductAvailabilityAndShipmentReq,
  getProductsReq,
  getUnitsReq,
  addProductListingByAdminReq,
  getCategoriesReq,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorAlert from "../../../components/ErrorAlert";
import { useHistory } from "react-router";
import RegistrationFormInput from "../../../components/RegistrationFormInput";
import { Controller, useForm } from "react-hook-form";
import {
  IMAGE_FORMATS,
  BASIC_INFO_INPUT_FIELDS_DATA,
  PRICING_INPUT_FIELDS,
} from "./AddProduct.constants";
import FloatLabelSelectDropDown from "../../../components/FloatLabelSelectDropDown";
import { customSelectStyles } from "../../../layouts/MainLayout/MainLayout.constants";
import { isObject } from "lodash";
import {
  s3_bucket_name,
  s3_access_key,
  s3_dir_name,
  s3_region,
  s3_secret_key,
} from "../../../config";
import ReactS3Client from "react-aws-s3-typescript";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddProduct(props: any) {
  // Configuration Variables
  const history = useHistory();
  let companyId: number = Number(props.match.params.companyId);
  const { Group, Control } = Form;
  const config: any = {
    bucketName: s3_bucket_name,
    dirName: s3_dir_name,
    region: s3_region,
    accessKeyId: s3_access_key,
    secretAccessKey: s3_secret_key,
  };
  const s3 = new ReactS3Client(config);
  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    register,
  } = useForm<any>();

  // State Variables
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productShipment, setProductShipment] = useState<
    { label: string; value: string }[] | []
  >([]);
  const [productAvailability, setProductAvailability] = useState<
    { label: string; value: string }[] | []
  >([]);
  const [units, setUnits] = useState<any[] | []>([]);
  const [products, setProducts] = useState<any[] | []>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [localImagesURLs, setLocalImagesURL] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<any[] | []>([]);

  // Store
  const state: any = useSelector((state) => state);
  const { userId, accessToken }: { userId: number; accessToken: string } =
    state.auth;

  const getunits = async () => {
    setLoading(true);
    try {
      const res: {
        data: {
          units: {
            id: number;
            name: string;
          }[];
        };
      } = await getUnitsReq();
      const { units } = res.data;
      setUnits(
        units.map((unit: { id: number; name: string }) => ({
          label: unit.name,
          value: unit.id,
        }))
      );
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };

  const getProductAvailabilityAndShipment = async () => {
    setLoading(true);
    try {
      const res: {
        data: {
          availability: string[];
          readyToShip: string[];
        };
      } = await getProductAvailabilityAndShipmentReq(
        accessToken,
        userId,
        companyId
      );
      const { availability, readyToShip } = res.data;
      setProductAvailability(
        availability.map((el: string) => ({
          label: el,
          value: el,
        }))
      );
      setProductShipment(
        readyToShip.map((el: string) => ({
          label: el,
          value: el,
        }))
      );
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };
  const getProducts = async (categoryId?: number) => {
    setLoading(true);
    try {
      const res: {
        data: {
          products: {
            id: number;
            name: string;
          }[];
        };
      } = await getProductsReq(categoryId);
      const { products } = res.data;
      setProducts(
        products.map((product: { id: number; name: string }) => ({
          label: product.name,
          value: product.id,
        }))
      );
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const res: {
        data: {
          categories: {
            id: number;
            name: string;
          }[];
        };
      } = await getCategoriesReq();
      const { categories } = res.data;
      setCategories(
        categories.map((category: { id: number; name: string }) => ({
          label: category.name,
          value: category.id,
        }))
      );
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };

  const addProductListing = async (body: any) => {
    setLoading(true);
    try {
      await addProductListingByAdminReq({
        adminId: userId,
        accessToken,
        body,
        companyId,
      });
      history.replace("productListings");
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };

  function handleSelectChange(e: any, type: string) {
    setValue(type, e);
    clearErrors(type);
  }

  const handleImageFileValidation: any = async (fileList: FileList) => {
    let imageURLs: string[] = [];
    if (fileList) {
      if (fileList.length >= 2 && fileList.length <= 4) {
        for (let i = 0; i < fileList.length; i++) {
          if (!IMAGE_FORMATS.includes(fileList[i]?.type)) {
            setImageError("Image should be jpeg, png or jpg");
            return;
          } else {
            setLoading(true);
            try {
              const res = await s3.uploadFile(fileList[i]);
              imageURLs = [...imageURLs, res.location];
            } catch (err: any) {
              setErrorMessage("Error occured while uploading");
            }
            setLoading(false);
          }
          setLocalImagesURL(imageURLs);
          setImageError(null);
        }
      } else {
        setImageError("Min 2 and Max 4 Images required");
        return;
      }
    } else {
      setImageError("Images required");
      return;
    }
  };

  function submitHandler(data: any, isDraft: boolean) {
    let body: any = {};
    for (let property in data) {
      if (isObject(data[property])) {
        body[property] = data[property]["value"];
      } else {
        body[property] = data[property] ? data[property] : null;
      }
    }
    addProductListing({ ...body, isDraft, images: localImagesURLs });
  }

  function onDraftClick(data: any) {
    submitHandler(data, true);
  }

  function onCreateClick(data: any) {
    submitHandler(data, false);
  }

  useEffect(() => {
    register("additionalInfo");
    getProductAvailabilityAndShipment();
    getunits();
    getCategories();
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <AdminLayout>
        <h4 className="m-4 mt-5">Add New Product Listing</h4>
        <div className="ms-4 me-4">
          <APCard>
            <form>
              <Row>
                <Col>
                  <h5 className="mb-3">
                    Basic Info{" "}
                    <span className="text-danger font-family-arial">*</span>
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"categoryId"}
                    placeHolder={""}
                    control={control}
                    label={"Category"}
                    rules={{ required: true }}
                    options={categories}
                    customStyle={customSelectStyles}
                    errorMessage={"Category is required"}
                    errors={errors}
                    onChange={(e) => {
                      handleSelectChange(e, "categoryId");
                      getProducts(e.value);
                    }}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"productId"}
                    placeHolder={""}
                    control={control}
                    label={"Product"}
                    rules={{ required: true }}
                    options={products}
                    customStyle={customSelectStyles}
                    errorMessage={"Product is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "productId")}
                  />
                </Col>
              </Row>
              <Row>
                {BASIC_INFO_INPUT_FIELDS_DATA.map((data, index) => (
                  <Col lg={6} md={6} sm={12} key={index}>
                    <RegistrationFormInput
                      name={data.name}
                      type={data.type}
                      placeHolder={data.placeHolder}
                      label={data.label}
                      control={control}
                      rules={data.rules}
                      onInput={data.onInput}
                      errors={errors}
                      errorMessage={data.errorMessage}
                    />
                  </Col>
                ))}
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-3">
                    Description and Images{" "}
                    <small className="text-danger font-family-arial">*</small>
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name="description"
                    type="text"
                    placeHolder="Enter Description"
                    label="Description"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    onInput={(e) => e.target.value.toString().trimStart()}
                    errors={errors}
                    errorMessage="Description is required"
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label=""
                    className="mb-3"
                  >
                    <Control
                      id="uploadImages"
                      type="file"
                      multiple
                      placeholder="Upload Images"
                      onChange={(event: any) => {
                        handleImageFileValidation(event.target.files);
                      }}
                      className="shadow-none ps-4 padding-top-20"
                    />
                    <p className="validation-error-alert">
                      <Form.Text className="text-danger">
                        {imageError && imageError}
                      </Form.Text>
                    </p>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-3">Additional Info</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <CKEditor
                    {...register("additionalInfo")}
                    editor={ClassicEditor}
                    config={{
                      toolbar: {
                        removeItems: ["uploadImage", "insertMedia"],
                        shouldNotGroupWhenFull: true,
                      },
                    }}
                    data=""
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      setValue("additionalInfo", data);
                    }}
                  />
                  <p className="validation-error-alert"></p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-3">
                    Pricing{" "}
                    <small className="text-danger font-family-arial">*</small>
                  </h5>
                </Col>
              </Row>
              <Row>
                {PRICING_INPUT_FIELDS.map((data, index) => (
                  <Col lg={6} md={6} sm={12} key={index}>
                    <RegistrationFormInput
                      name={data.name}
                      type={data.type}
                      placeHolder={data.placeHolder}
                      label={data.label}
                      control={control}
                      rules={data.rules}
                      errors={errors}
                      errorMessage={data.errorMessage}
                    />
                  </Col>
                ))}
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"unitId"}
                    placeHolder={""}
                    control={control}
                    label={"Unit"}
                    rules={{ required: true }}
                    options={units}
                    customStyle={customSelectStyles}
                    errorMessage={"Unit is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "unitId")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-3">Packaging </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name="packSize"
                    type="number"
                    placeHolder="Enter Pack Size"
                    label="Pack Size"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    errors={errors}
                    errorMessage="Pack Size is Required"
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"packSizeUnitId"}
                    placeHolder={""}
                    control={control}
                    label={"Pack Size Unit"}
                    rules={{ required: false }}
                    options={units}
                    customStyle={customSelectStyles}
                    errorMessage={"Pack Size is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "packSizeUnitId")}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name="packInfo"
                    type="text"
                    placeHolder="Packaging Info"
                    label="Packaging Info"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    errors={errors}
                    errorMessage="Packaging Info is Required"
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name="leadTime"
                    type="number"
                    placeHolder="Lead Time (In Days)"
                    label="Lead Time (In Days)"
                    control={control}
                    rules={{
                      required: false,
                    }}
                    errors={errors}
                    errorMessage="Lead Time is Required"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-3">
                    Shipment{" "}
                    <small className="text-danger font-family-arial">*</small>
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"readyToShip"}
                    placeHolder={""}
                    control={control}
                    label={"Ready to Ship"}
                    rules={{ required: true }}
                    options={productShipment}
                    customStyle={customSelectStyles}
                    errorMessage={"Ready to Ship is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "readyToShip")}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"availability"}
                    placeHolder={""}
                    control={control}
                    label={"Availability"}
                    rules={{ required: true }}
                    options={productAvailability}
                    customStyle={customSelectStyles}
                    errorMessage={"Availability is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "availability")}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <APButton
                  onClick={handleSubmit(onDraftClick)}
                  disabled={loading}
                  className="me-3 bg-light text-success"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Save as Draft"
                  )}
                </APButton>
                <APButton
                  onClick={handleSubmit(onCreateClick)}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Create"
                  )}
                </APButton>
              </div>
            </form>
          </APCard>
        </div>
      </AdminLayout>
    </>
  );
}

export default AddProduct;
