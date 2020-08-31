import APIError from '../../lib/APIError';
import { msg } from '../../lib/messages';
import ContactUs from '../../models/ContactUs';
import Team from '../../models/Team';
import Common from '../../models/Common';
import Enquiry from '../../models/Enquiry';
const HttpStatus = require('http-status-codes');

class EnquiryService {

    async addEnquiry(data) {
        try {
            let enquiry = new Enquiry({
                ...data
            });
            enquiry = await enquiry.save();
            return enquiry;
        } catch (error) {
            throw error;
        }
    }
    async getEnquiry() {
        try {
            let enquiry = await Enquiry.find({});
            return enquiry;
        } catch (error) {
            throw error;
        }
    }

    async contactUs(data) {
        try {
            const { email, name, subject, message } = data;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) throw new APIError({ message: msg("please enter a valid email"), status: HttpStatus.UNPROCESSABLE_ENTITY })

            let contactus = new ContactUs({
                email,
                name,
                subject,
                message
            });
            contactus = await contactus.save();
            return contactus
        } catch (error) {
            throw error;
        }

    }

    async addTeamMember(data) {
        try {
            let teamMember = new Team({
                ...data
            });
            teamMember = await teamMember.save();
            return teamMember
        } catch (error) {
            throw error;
        }
    }
    async getTeamMember() {
        try {
            let teamMember = await Team.find({});
            return teamMember;
        } catch (error) {
            throw error;
        }
    }
    async deleteTeamMember(teamId) {
        try {
            let result = await Team.findByIdAndDelete(teamId);
            console.log(result)
            if (!result) {
                throw new APIError({ message: 'TeamMember does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }


    async getLookUpData() {
        try {
            let commonData = await Common.find({});
            return commonData;
        } catch (error) {
            throw error;
        }
    }

    async addSubscribe(data) {
        try {
            const { email } = data;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) throw new APIError({ message: msg("please enter a valid email"), status: HttpStatus.UNPROCESSABLE_ENTITY })

            let subcribe = new ContactUs({
                email,
                slug: 'subscribe'
            });
            subcribe = await subcribe.save();
            return subcribe
        } catch (error) {
            throw error;
        }
    }

    async getSubscribeUser() {
        try {
            let subscribeUser = await ContactUs.find({ slug: "subscribe" });
            return subscribeUser;
        } catch (error) {
            throw error;
        }
    }
   
}

export default new EnquiryService();
