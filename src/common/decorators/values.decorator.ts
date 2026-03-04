import { applyDecorators, UseGuards } from "@nestjs/common";
import { HasValuesGuard } from "src/common/guards/values.guard";


export function HasValues() {
  return applyDecorators(
    UseGuards(HasValuesGuard)
  )
}