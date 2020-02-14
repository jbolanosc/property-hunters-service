import { Request, Response } from "express";

import Property from "../models/Property";

export async function getProperties(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const properties = await Property.find();
    return res.json(properties).status(200);
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function createProperty(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const {
      name,
      mapCoords,
      beds,
      baths,
      address,
      constructionSize,
      lotSize,
      description,
      parking,
      price,
      seller,
      propertyType
    } = req.body;

    const newProperty = {
      name,
      mapCoords,
      beds,
      baths,
      address,
      constructionSize,
      lotSize,
      description,
      parking,
      price,
      seller,
      propertyType,
      imagePath: req.file.url || ""
    };

    const property = new Property(newProperty);
    await property.save();
    return res
      .json({
        message: "Property Saved Successfully",
        property
      })
      .status(200);
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function getProperty(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const property = await Property.findById(id);
  if (property) {
    return res.json(property).status(200);
  } else {
    return res.json({ msg: "No property found." }).status(400);
  }
}

export async function deleteProperty(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndRemove(id);
    if (property) {
      return res.json({ message: "Property Deleted" }).status(200);
    } else {
      return res.json({ msg: "No Property found." }).status(400);
    }
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function updateProperty(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const {
      name,
      mapCoords,
      beds,
      baths,
      address,
      constructionSize,
      lotSize,
      description,
      parking,
      price,
      seller,
      propertyType
    } = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(id, {
      name,
      mapCoords,
      beds,
      baths,
      address,
      constructionSize,
      lotSize,
      description,
      parking,
      price,
      seller,
      propertyType,
      imagePath: req.file.url
    });
    return res
      .json({
        message: "Successfully updated",
        updatedProperty
      })
      .status(200);
  } catch (ex) {
    res.json(ex).status(500);
  }
}

export interface IMulterRequest extends Request {
  file: any;
}
