import { Injectable, NotFoundException } from '@nestjs/common';
import { google } from 'googleapis';
import { TenantContextService } from 'src/core/services/tenant-context.service';

@Injectable()
export class SheetsService {
  constructor(private readonly tenantContextService: TenantContextService) {}
  
   googleSheetsId = '1VVqHdC_xcm8dCRB-2A2YR2_zaOi5OMMNg392HOT_SVA';
   googleServiceAccontEmail = 'spreadsheets@chillhopstudio-api.iam.gserviceaccount.com';
   googlePrivateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyO67gawKVQhdT\nV4dCxeDqoml2zy6X1+GY9VXfQZ6sGlCjGkH85ZtHFSR5jwOszS2SIim33ZDcl0qq\nNQMHeGhrAcKrukoLxTmegYn1UPfEVk2Kxt6Cz9SZj+HQ4Fg97QE+3EiC7tcmA6o+\nG+g5pXvW+sRyBa/i2PX2LjGC0s9/lkO69oa9prZdtflhDXpoB63Ayex02kGBvv+F\nuUbhfMYqGsEyRGWD5exRYlukOIusD3xM4V1nDxh00hXMAvQ/VQ9YdN/+t2XoLxVy\n6ofucXsG7MP4+9NxD6BS+fVi+lvifAmxePyOsbINDYgcHglHEmfyUKRTySEbGTu3\nmrsEi1wDAgMBAAECggEASHaVee5n5XEydJLwjkhPUnXntQM06U0/DmYonJVcQpKM\nWFOzonNjdzn0U2u+zcG5lmFHXta5L8Ze9+aHrcDZiy/zCsi5lCGCdJwsD830fiGs\ncxC5pKuEv05NPBQKLFswl3MOFBWw6WayD4BfIRjTyaq4tbb0NKGLFqTfQlYdQLyU\naUmoFuNHK0yqEAMgEwJQ1Ynh+vptDieoaoj/yv79Vz1uh5Ds2f5WcEYDFYOoq99K\nDilEM5nxZW6BSvfB6kRZ41RNZe2zFVzgS+1rz0zNQAmRVI2SoVSVFl//YW6rl4OO\nK6fR4WMgC5Oh2BO8f+t8sC39FV4giRESUevSTCumIQKBgQDWl6xSeQxhJSARhgER\nr1nl3fNSaGVH+ANdkZxSF89EsXUUHS72z84H0ddI7qORVUkXARMk7fecKU4lgOF7\ns71KkZnaDsb2y3iZ8uiOfvxC3JZm536ZlWif4ez5NgFY7qK0zUoKnxFbp8yDnVRm\ndBZbQqss0uCsunOPEHgXjUKeEwKBgQDUn/NTpsWbHL5mLC9BeOOML0B8AaJ3p3Pg\nRJf9mSQmOUa5cCHtnSD8rNluUI7uy32xsWyaD47mplk5mLQlEBT54deRJvPasySD\nqLCbviPTjdF+YJ63kUa6PN6ybn9Y/484U0dOKM1k2Tkp9+++oeh0Eb7C+qMMehK9\nECWzijZIUQKBgB5JthbF4wtrFAWlJk16tHOPSiKdfX4U8VSpkqi7l5OYgG/gVpqb\nZfcQlRREKm3+3ZwTmMIjnEk8Qz1j3W96RQNbXZ27bDW1LkZ8VHqYTb6aJ9hKYEIJ\nJoU6fBoIl1QYCnr+Zq7tGKQZIPKKqDj1tZoX5NUkxnVas6jDqE+aroZlAoGBALnW\nExZJ7OxlcwRaGfNfdYJQykuYIifyc5TQXweHkdDWvrnVB9JmQy6U5HVGc6bCtFla\neVEtx/hP7CwrC0hZhfvhKEf1g6ziZkesaK+2wBlnGnMaf55xmx+rk/jgGu3ub38L\nSodFoj9CnHPR//jeCg1odRJ1fYyqJTaZploFsuwBAoGBAIR6t8xvVaKEWCC7WFza\ndl6x+4GRMsb9gL+8JWSxZmey17CUJ1gI3nprNvtjlkfRDqgnRpdR7W0iVHl0AXCR\nQtxPfQlZXmmw70hfjp27N86sDlLRlQtaMLANOjMtGezemH0kiygQdzf2rILYqPie\nJz+/ipP88nNHmF+Okofw9Oj6\n-----END PRIVATE KEY-----\n";

  async getGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: this.googleServiceAccontEmail,
        private_key: this.googlePrivateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({
      version: "v4",
      auth: auth,
    });

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.tenantContextService.getTenantSpreadsheets(),
        range: 'Hoja 1',
      });

      return response.data.values;
    } catch (error) {
      throw new NotFoundException('Failed to get Google Sheets client');
    }
  }

}