import APIError from '../../lib/APIError';
import { msg } from '../../lib/messages';
import ContactUs from '../../models/ContactUs';
import TeamMember from '../../models/team';
import Enquiry from '../../models/enquiry';

class CourseService {

    async contactUs(data) {
        try {
            const { email, fullname, phoneNumber, query } = data;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) throw new APIError({ message: msg("please enter a valid email") })

            let contactus = new ContactUs({
                email,
                fullname,
                phoneNumber,
                query
            });
            contactus = await contactus.save();
            return contactus
        } catch (error) {
            throw error
        }

    }
    async addTeamMembers(data) {
        try {
            let teamMember = new TeamMember({
                ...data
            });
            teamMember = await teamMember.save();
            return teamMember
        } catch (error) {
            throw error;
        }
    }
    async addEnquiry(data) {
        try {
            let enquiry = new Enquiry({
                ...data
            });
            enquiry = await enquiry.save();
            return enquiry
        } catch (error) {
            throw error;
        }
    }

}

export default new CourseService();