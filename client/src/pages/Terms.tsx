import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import { TextShell } from "../components/text";

/**
 * Terms and Conditions page
 *
 * @category Pages
 *
 * @returns {JSX.Element} Terms and Conditions page
 */
const Terms = () => {
  return (
    <TextShell>
      <Heading as="h1">Terms and Conditions</Heading>

      <Text>
        Welcome to Our Website! By accessing or using our website, you agree to
        be bound by these terms and conditions.
      </Text>

      <Heading>Acceptance of Terms</Heading>
      <Text>
        By submitting images, uploading images, and restoring color to images,
        you acknowledge and agree to these terms and conditions in full. If you
        disagree with these terms and conditions or any part of these terms and
        conditions, you must not use this website.
      </Text>

      <Heading>User Submitted Images</Heading>
      <Text>
        Users are permitted to upload digital images to our platform. The images
        you upload may be viewed by other users of this site and used in
        accordance with the following terms:
      </Text>
      <List styleType="disc" pl={5}>
        <ListItem>
          Users retain ownership of the images they upload but grant [Your
          Website] a worldwide, irrevocable, non-exclusive, royalty-free license
          to use, reproduce, adapt, publish, translate and distribute their
          images in any existing or future media.
        </ListItem>
        <ListItem>
          You warrant and represent that the images do not infringe on any third
          party's rights (including intellectual property rights) and that they
          comply with all applicable laws and regulations.
        </ListItem>
        <ListItem>
          You are responsible for any claims brought against [Your Website]
          arising out of or related to the images you submit.
        </ListItem>
      </List>

      <Heading>Acceptance of Terms</Heading>
      <Text>
        The images you upload will be stored on our servers as part of our
        service offering. While we endeavor to ensure the security of all data,
        we cannot guarantee the complete security of data sent over the
        internet.
      </Text>

      <Heading>Sharing of Images</Heading>
      <Text>
        Images submitted to our site may be shared publicly in our gallery. By
        uploading your images, you consent to their public display.
      </Text>

      <Heading>Amendments</Heading>
      <Text>
        rgbaddies reserves the right to revise these terms and conditions from
        time to time. The revised terms and conditions will apply to the use of
        our website from the date of publication of the revised terms and
        conditions on this website. Please check this page regularly to ensure
        you are familiar with the current version.
      </Text>

      <Heading>Limitation of Liability</Heading>
      <Text>
        rgbaddies will not be liable for any direct, indirect, special or
        consequential loss or damage arising under these terms and conditions or
        in connection with our website, whether arising in tort, contract, or
        otherwise - including, without limitation, any loss of profit,
        contracts, business, goodwill, data, income, revenue or anticipated
        savings.
      </Text>

      <Heading>Contact Information</Heading>
      <Text>
        If you have any questions about these Terms and Conditions, please
        contact us at [Contact Information].
      </Text>
    </TextShell>
  );
};

export default Terms;
