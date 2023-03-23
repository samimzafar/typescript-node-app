import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import FloatingTextArea from "../../components/FloatingTextArea";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { setLoading, addDescription } from "./ProductListings.actions";
import { IMAGE_FORMATS } from "./ProductListings.constants";
import {
  s3_bucket_name,
  s3_access_key,
  s3_dir_name,
  s3_region,
  s3_secret_key,
} from "../../config";
import ReactS3Client from "react-aws-s3-typescript";
window.Buffer = window.Buffer || require("buffer").Buffer;

interface DescriptionProps {
  setVisibleForm: (visible: string) => void;
}

interface IFormFields {
  description: string;
}

interface IFormValues {
  description: string;
}

const Description = ({ setVisibleForm }: DescriptionProps) => {
  const state: any = useSelector((state) => state);
  const { isLoading, product } = state;
  const { description, images } = product;
  const config: any = {
    bucketName: s3_bucket_name,
    dirName: s3_dir_name,
    region: s3_region,
    accessKeyId: s3_access_key,
    secretAccessKey: s3_secret_key,
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [localImagesURLs, setLocalImagesURL] = useState<string[] | []>([]);

  const s3 = new ReactS3Client(config);

  const { Group, Label, Control } = Form;
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IFormFields>();

  const dispatch = useDispatch();

  const onHandleNext: any = async (values: IFormValues) => {
    if (localImagesURLs.length != 0 && !imageError) {
      dispatch(
        addDescription({
          description: values.description,
          images: localImagesURLs,
        })
      );

      setVisibleForm("priceAndPackaging");
    } else {
      setImageError("Images Required");
      return;
    }
  };

  const handleImageFileValidation: any = async (fileList: FileList) => {
    let imageURLs: string[] = [];
    if (fileList) {
      if (fileList.length >= 2 && fileList.length <= 4) {
        for (let i = 0; i < fileList.length; i++) {
          if (!IMAGE_FORMATS.includes(fileList[i]?.type)) {
            setImageError("Image should be jpeg, png or jpg");
            return;
          } else {
            dispatch(setLoading(true));
            try {
              const res = await s3.uploadFile(fileList[i]);
              imageURLs = [...imageURLs, res.location];
            } catch (err: any) {
              setErrorMessage(err.response.data);
            }
            dispatch(setLoading(false));
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

  useEffect(() => {
    if (description && images) {
      setValue("description", description);
      setLocalImagesURL(images);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <div style={{ height: "100vh" }}>
        <div className="form-div">
          <h5 className="font-weight-bold">Description</h5>
          <form>
            <FloatingTextArea
              name="description"
              type="text"
              placeHolder="Add a Product Description"
              label="Add a Product Description"
              control={control}
              rules={{ required: true }}
              errors={errors}
              errorMessage={"Description is Required"}
            />
            <Group controlId="file" className="mb-3">
              <Label>
                <div>
                  Upload Images <span className="text-danger">*</span>
                </div>
              </Label>
              <Control
                type="file"
                multiple
                onChange={(event: any) => {
                  handleImageFileValidation(event.target.files);
                }}
              />
              <p className="validation-error-alert">
                <Form.Text className="text-danger">
                  {imageError && imageError}
                </Form.Text>
              </p>
            </Group>
            {localImagesURLs.length !== 0 && (
              <div className="photo-container">
                {localImagesURLs.map((image: string, key: number) => {
                  return (
                    <img key={key} className="product-photo" src={image} />
                  );
                })}
              </div>
            )}
            <div className="mt-2 d-flex justify-content-between">
              <button
                className="site-btn"
                onClick={() => setVisibleForm("basicInfo")}
              >
                {" "}
                <AiOutlineArrowLeft className="me-1 mb-1" />
                Back
              </button>
              <button className="site-btn" onClick={handleSubmit(onHandleNext)}>
                Next
                <AiOutlineArrowRight className="ms-1 mb-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Description;
