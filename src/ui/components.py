import streamlit as st
from streamlit_extras.badges import badge


def render_profile_card(profile: dict):
    st.markdown("### Profile Overview")
    col1, col2 = st.columns([1, 3])

    with col1:
        # Profile Image placeholder
        st.image("https://avatars.githubusercontent.com/u/583231?v=4", width=120)

        st.markdown(f"**{profile.get('name', '')}**")
        contact = profile.get("contact", {})

        if contact.get("primary_email"):
            st.markdown(f"- 📧 {contact.get('primary_email')}")
        if contact.get("secondary_email"):
            st.markdown(f"- ✉️ {contact.get('secondary_email')}")
        if contact.get("primary_phone"):
            st.markdown(f"- 📞 {contact.get('primary_phone')}")
        if contact.get("secondary_phone"):
            st.markdown(f"- 📱 {contact.get('secondary_phone')}")
        if contact.get("address"):
            st.markdown(f"- 📍 {contact.get('address')}")

        st.markdown("**Links:**")
        for link in profile.get("links", []):
            url = link.get("url")
            typ = link.get("type")
            if url:
                st.markdown(f"- [{typ}]({url})")

    with col2:
        st.markdown("**Summary**")
        st.write(profile.get("summary", ""))

        st.markdown("**Domains**")
        # for domain in profile.get("domains", []):
        #     st.markdown(
        #         f'<span style="background-color:#0077b6;color:white;border-radius:4px;padding:4px 8px;margin:2px;display:inline-block;">{domain}</span>',
        #         unsafe_allow_html=True
        #     )

        domain_html = '<div style="display: flex; flex-wrap: wrap; gap: 6px;">'

        for domain in profile.get("domains", []):
            domain_html += f'<span style="background-color:#0077b6;color:white;border-radius:4px;padding:4px 8px;margin:2px;display:inline-block;"">{domain}</span>'

        domain_html += '</div>'

        st.markdown(domain_html, unsafe_allow_html=True)

        st.markdown("**Skills**")
        # for skill in profile.get("skills", []):
        #     st.markdown(
        #         f'<span style="background-color:#43aa8b;color:white;border-radius:4px;padding:4px 8px;margin:2px;display:inline-block;">{skill}</span>',
        #         unsafe_allow_html=True
        #     )

        skill_html = '<div style="display: flex; flex-wrap: wrap; gap: 6px;">'

        for skill in profile.get("skills", []):
            skill_html += f'<span style="background-color:#43aa8b; color:white; border-radius:4px; padding:4px 8px; white-space:nowrap;">{skill}</span>'

        skill_html += '</div>'

        st.markdown(skill_html, unsafe_allow_html=True)



def render_timeline(items, title, date_start_key="start_date", date_end_key="end_date"):
    st.markdown(f"### {title}")
    for item in items:
        start_date = item.get(date_start_key, "")
        end_date = item.get(date_end_key, "")
        time_period = f"{start_date} - {end_date if end_date else 'Present'}"
        st.markdown(f"**{item.get('job_title', item.get('degree', ''))} at {item.get('company', item.get('institution', ''))}**")
        st.markdown(f"*{time_period}*")
        description = item.get("description", "")
        if description:
            st.write(description)
        achievements = item.get("achievements", [])
        if achievements:
            st.markdown("**Achievements:**")
            for ach in achievements:
                st.markdown(f"- {ach}")
        st.divider()
